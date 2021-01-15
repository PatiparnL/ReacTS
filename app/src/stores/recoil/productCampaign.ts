import {
    atom
} from 'recoil';

import {
    TaskProduct_Response,
    TaskHierarchy_Response,
    IHierarchy,
    TaskInsurerDetail_Response
} from './../../models/telesale';

import {
    BreadCrumb
} from './../../models/hierarchy';

export const TaskProduct = atom<TaskProduct_Response[]>({
    key: 'TaskProduct',
    default: [],
});

export const TaskInsurerDetail = atom<TaskInsurerDetail_Response[]>({
    key: 'TaskInsurerDetail',
    default: [],
});

export const SelectedProduct = atom<string | undefined>({
    key: 'SelectedProduct',
    default: '',
});

export const SelectedCompany = atom<string | undefined>({
    key: 'SelectedCompany',
    default: '',
});

export const SelectedProductType = atom<string | undefined>({
    key: 'SelectedProductType',
    default: '',
});

export const TaskHierarchy = atom<TaskHierarchy_Response[]>({
    key: 'TaskHierarchy',
    default: [],
});

export const SetHierarchies = atom<IHierarchy[]>({
    key: 'SetHierarchies',
    default: [],
});

export const SetDataBreadCrumb = atom<BreadCrumb[]>({
    key: 'SetDataBreadCrumb',
    default: [],
});