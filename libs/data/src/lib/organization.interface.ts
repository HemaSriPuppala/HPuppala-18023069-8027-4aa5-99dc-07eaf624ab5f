export interface Organization {
    id: string;
    name: string;
    parent?: Organization;
    children?: Organization[];
}
