import { Routes } from '@angular/router';

export const content: Routes = [
    { 
        path: 'user',
        loadChildren: () => import('../../pages/user/user.module').then((m) => m.UserModule),
    },
    { 
        path: 'search',
        loadChildren: () => import('../../pages/search/search.module').then((m) => m.SearchModule),
    }
];