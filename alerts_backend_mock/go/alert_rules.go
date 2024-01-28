package swagger

import (
	"github.com/google/uuid"
	"math/rand"
	"time"
)

type AlertRulesSvc struct {
	dataStore DataStore
	alertsSvc *AlertsSvc
}

func NewAlertRulesSvc(
	dataStore DataStore,
	alertsSvc *AlertsSvc,
) *AlertRulesSvc {
	return &AlertRulesSvc{
		dataStore: dataStore,
		alertsSvc: alertsSvc,
	}
}

func (svc *AlertRulesSvc) CreateAlertRule(
	postbleAlertRule PostableAlertRule,
) AlertRule {
	alertRule := AlertRule{
		Id:          uuid.New().String(),
		Status:      AlertRuleNormal,
		Name:        postbleAlertRule.Name,
		Expression:  postbleAlertRule.Expression,
		Labels:      postbleAlertRule.Labels,
		Annotations: postbleAlertRule.Annotations,
		Description: postbleAlertRule.Description,
		Interval:    postbleAlertRule.Interval,
		For_:        postbleAlertRule.For_,
	}
	if alertRule.For_ == 0 {
		alertRule.For_ = 1257893400000000000
	}

	if alertRule.Interval == 0 {
		alertRule.Interval = 600
	}
	svc.dataStore.CreateAlertRule(alertRule)
	return alertRule
}

func (svc *AlertRulesSvc) UpdateAlertRule(alertRule AlertRule) {
	svc.dataStore.UpdateAlertRule(alertRule)
}

func (svc *AlertRulesSvc) GetAlertRules() []AlertRule {
	return svc.dataStore.GetAlertRules()
}

func (svc *AlertRulesSvc) GetAlertRule(id string) (AlertRule, bool) {
	return svc.dataStore.GetAlertRule(id)
}

func (svc *AlertRulesSvc) EvaluateAlertRules() {
	alertRules := svc.GetAlertRules()
	for _, alertRule := range alertRules {
		svc.evaluateAlertRule(alertRule)
	}
}

func (svc *AlertRulesSvc) evaluateAlertRule(alertRule AlertRule) {
	alerts := svc.alertsSvc.GetAlerts()
	if len(alerts) == 100 {
		svc.alertsSvc.DeleteAllAlerts()
	}

	// 1 in 5 chance of creating an alert
	n := rand.Intn(5)
	if n != 2 {
		return
	}

	for _, alert := range alerts {
		if alert.AlertRuleUUID == alertRule.Id {
			alert.UpdatedAt = time.Now()
			alert.Status = "Firing"
			svc.alertsSvc.UpdateAlert(alert)
			return
		}
	}

	alert := Alert{
		Id:            uuid.New().String(),
		Name:          alertRule.Name + " alert",
		Expression:    alertRule.Expression,
		StartsAt:      time.Now(),
		UpdatedAt:     time.Now(),
		EndsAt:        time.Now().Add(time.Minute * 10),
		Status:        "Pending",
		Labels:        alertRule.Labels,
		Annotations:   alertRule.Annotations,
		AlertRuleUUID: alertRule.Id,
	}
	svc.alertsSvc.CreateAlert(alert)
	alertRule.Status = AlertRuleFiring
	svc.UpdateAlertRule(alertRule)
}
