package swagger

type AlertsSvc struct {
	dataStore DataStore
}

func NewAlertsSvc(dataStore DataStore) *AlertsSvc {
	return &AlertsSvc{
		dataStore: dataStore,
	}
}

func (svc *AlertsSvc) CreateAlert(alert Alert) {
	svc.dataStore.CreateAlert(alert)
}

func (svc *AlertsSvc) UpdateAlert(alert Alert) {
	svc.dataStore.UpdateAlert(alert)
}

func (svc *AlertsSvc) GetAlerts() []Alert {
	return svc.dataStore.GetAlerts()
}

func (svc *AlertsSvc) GetAlert(id string) (Alert, bool) {
	return svc.dataStore.GetAlert(id)
}

func (svc *AlertsSvc) DeleteAllAlerts() {
	svc.dataStore.DeleteAllAlerts()
}
