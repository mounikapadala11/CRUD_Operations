package swagger

import (
	"time"
)

type Services struct {
	alertsService     *AlertsSvc
	alertRulesService *AlertRulesSvc
	adminSvc          *AdminService
}

var singletonServices *Services

func init() {
	ds := NewInMemoryDataStore()
	alertsSvc := NewAlertsSvc(ds)
	alertRulesSvc := NewAlertRulesSvc(ds, alertsSvc)
	go func() {
		t := time.NewTicker(30 * time.Second)
		done := make(chan bool)

		for {
			select {
			case <-done:
				return
			case <-t.C:
				alertRulesSvc.EvaluateAlertRules()
			}
		}
	}()

	adminSvc := NewAdminService(ds)

	singletonServices = &Services{
		alertsService:     alertsSvc,
		alertRulesService: alertRulesSvc,
		adminSvc:          adminSvc,
	}
}

func (s *Services) AlertsService() *AlertsSvc {
	return s.alertsService
}

func (s *Services) AlertRulesService() *AlertRulesSvc {
	return s.alertRulesService
}

func (s *Services) AdminService() *AdminService {
	return s.adminSvc
}
