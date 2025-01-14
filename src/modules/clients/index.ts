// ACTIONS
export * from './actions/create-client';
export * from './actions/delete-client';
export * from './actions/get-all-clients';
export * from './actions/get-clients-types';
export { getClientsById } from './actions/get-clients-by-id';
export { updateClients } from './actions/update-clients';
export { getClientByCI } from './actions/get-client-by-ci';

// COMPONENTS
export { NewClientsForm} from './components/NewClientsForm';
export * from './components/ClientsReportCard';
export * from './components/clients-table/ClientsTable';
export { EditClientsForm } from './components/EditClientsForm';


// INTERFACES
export * from './interfaces/create-clients-response';
export * from './interfaces/clients-types-response';
export * from './interfaces/clients-response';
export * from './interfaces/simple-clients';