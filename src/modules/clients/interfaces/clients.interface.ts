export interface IClient {
    id: string;
    ci: string;
    name: string;
    firstSurname: string;
    secondSurname: string | null;
    createdAt: Date;
    updatedAt: Date;
}