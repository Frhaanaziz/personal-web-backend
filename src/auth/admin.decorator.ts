import { SetMetadata } from '@nestjs/common';

export const IS_ADMIN_KEY = 'isAdmin';
export const Public = () => SetMetadata(IS_ADMIN_KEY, true);
