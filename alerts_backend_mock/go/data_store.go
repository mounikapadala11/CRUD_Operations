package swagger

import (
	"sync"
)

type DataStore interface {
	GetAlerts() []Alert
	GetAlert(id string) (Alert, bool)
	CreateAlert(alert Alert)
	UpdateAlert(alert Alert)
	DeleteAllAlerts()
	GetAlertRules() []AlertRule
	GetAlertRule(id string) (AlertRule, bool)
	CreateAlertRule(alertRule AlertRule)
	UpdateAlertRule(alertRule AlertRule)
	Reset()
}

type InMemoryDataStore struct {
	mu            sync.Mutex
	alertsMap     map[string]Alert
	alertRulesMap map[string]AlertRule
}

func NewInMemoryDataStore() DataStore {
	return &InMemoryDataStore{
		alertsMap:     map[string]Alert{},
		alertRulesMap: map[string]AlertRule{},
	}
}

func (ds *InMemoryDataStore) GetAlerts() []Alert {
	alerts := make([]Alert, 0, len(ds.alertsMap))
	for _, alert := range ds.alertsMap {
		alerts = append(alerts, alert)
	}
	return alerts
}

func (ds *InMemoryDataStore) GetAlert(id string) (Alert, bool) {
	alert, ok := ds.alertsMap[id]
	return alert, ok
}

func (ds *InMemoryDataStore) CreateAlert(alert Alert) {
	ds.mu.Lock()
	ds.alertsMap[alert.Id] = alert
	ds.mu.Unlock()
}

func (ds *InMemoryDataStore) UpdateAlert(alert Alert) {
	ds.mu.Lock()
	ds.alertsMap[alert.Id] = alert
	ds.mu.Unlock()
}

func (ds *InMemoryDataStore) DeleteAllAlerts() {
	ds.mu.Lock()
	ds.alertsMap = map[string]Alert{}
	ds.mu.Unlock()
}

func (ds *InMemoryDataStore) GetAlertRules() []AlertRule {
	alertRules := make([]AlertRule, 0, len(ds.alertRulesMap))
	for _, alertRule := range ds.alertRulesMap {
		alertRules = append(alertRules, alertRule)
	}
	return alertRules
}

func (ds *InMemoryDataStore) GetAlertRule(id string) (AlertRule, bool) {
	alertRule, ok := ds.alertRulesMap[id]
	return alertRule, ok
}

func (ds *InMemoryDataStore) CreateAlertRule(
	alertRule AlertRule,
) {
	ds.mu.Lock()
	ds.alertRulesMap[alertRule.Id] = alertRule
	ds.mu.Unlock()
}

func (ds *InMemoryDataStore) UpdateAlertRule(alertRule AlertRule) {
	if _, ok := ds.alertRulesMap[alertRule.Id]; !ok {
		ds.CreateAlertRule(alertRule)
	} else {
		ds.mu.Lock()
		ds.alertRulesMap[alertRule.Id] = alertRule
		ds.mu.Unlock()
	}
}

func (ds *InMemoryDataStore) Reset() {
	ds.mu.Lock()
	ds.alertsMap = map[string]Alert{}
	ds.alertRulesMap = map[string]AlertRule{}
	ds.mu.Unlock()
}
