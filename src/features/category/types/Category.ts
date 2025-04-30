
export interface RawCategory{
    slug: string,
    name : string,
    url :string
}
export interface Category {
    slug: string;
    name: string;
    url: string;
    image:string;
    groupId :string;
    parentId?:string;
}

export interface CategoryGroup{
    id:string;
    name:string;
    categories :Category[];
}