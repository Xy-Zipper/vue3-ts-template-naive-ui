export interface MenuItem {
  id: string;
  fullName: string;
  parentId: string;
  icon: string;
  hasChildren: boolean;
  urlAddress: string;
  linkTarget: "_self" | "_blank";
  children: MenuItem[] | null;
  type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  iconBackgroundColor: string;
  menuId: string | null;
  sortCode: number;
  description: string;
}

export interface GroupItem<T = string> {
  key: "-1" | string;
  name: "其他" | string;
  list: T[];
}
