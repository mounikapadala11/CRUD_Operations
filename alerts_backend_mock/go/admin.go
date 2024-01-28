package swagger

type AdminService struct {
	dataStore DataStore
}

func NewAdminService(dataStore DataStore) *AdminService {
	return &AdminService{
		dataStore: dataStore,
	}
}

func (svc *AdminService) ClearDS() {
	svc.dataStore.Reset()
}
