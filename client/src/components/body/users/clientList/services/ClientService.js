const KEYS = {
    clients: 'clients',
    clientId: 'clientId'
}

export const getServiceTypeCollection = () => ([
    { id: '1', title: 'IT Services' },
    { id: '2', title: 'Marketing' },
    { id: '3', title: 'Manufacturing' },
    { id: '4', title: 'Sales and Control' },
    { id: '5', title: 'Hotel Services' },
    { id: '6', title: 'Other' },
])

export function insertClient(data) {
    let clients = getAllClients();
    data['id'] = generateClientId()
    clients.push(data)
    localStorage.setItem(KEYS.clients, JSON.stringify(clients))
}

export function updateClient(data) {
    let clients = getAllClients();
    let recordIndex = clients.findIndex(x => x.id == data.id);
    clients[recordIndex] = { ...data }
    localStorage.setItem(KEYS.clients, JSON.stringify(clients));
}

export function deleteClient(id) {
    let clients = getAllClients();
    clients = clients.filter(x => x.id != id)
    localStorage.setItem(KEYS.clients, JSON.stringify(clients));
}

export function generateClientId() {
    if (localStorage.getItem(KEYS.clientId) == null)
        localStorage.setItem(KEYS.clientId, '0')
    var id = parseInt(localStorage.getItem(KEYS.clientId))
    localStorage.setItem(KEYS.clientId, (++id).toString())
    return id;
}

export function getAllClients() {
    if (localStorage.getItem(KEYS.clients) == null)
        localStorage.setItem(KEYS.clients, JSON.stringify([]))
    let clients = JSON.parse(localStorage.getItem(KEYS.clients));
    //map serviceTypeID to serviceType title
    let serviceTypes = getServiceTypeCollection();
    return clients.map(x => ({
        ...x,
        serviceType: serviceTypes[x.serviceTypeId - 1].title
    }))
}