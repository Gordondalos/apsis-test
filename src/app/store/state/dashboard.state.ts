import { RolesInterface } from '../../interfaces/roles.interface';

export interface IDashboardState {
  dashboardType?: string;
  groupName?: string;
  id?: number| string;
  inactive?: boolean;
  parentId?: number;
  storeTemplateId?: string | number;
  title?: string;
  code?: any;
  comment?: string;
  isMain?: boolean;
  availableRoles?: Array<RolesInterface>
}


export const dashboardState: IDashboardState = {
}

