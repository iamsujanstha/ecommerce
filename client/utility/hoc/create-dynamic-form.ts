/* eslint-disable @typescript-eslint/no-explicit-any */
import dynamic from 'next/dynamic';
import { CommonFormProps } from '@/components/core/common-form/CommonForm';

type DynamicCommonForm<T extends Record<string, any>> = React.ComponentType<CommonFormProps<T>>;

export const createDynamicCommonForm = <T extends Record<string, any>,>() =>
  dynamic<CommonFormProps<T>>(
    () => import('@/components/core/common-form/CommonForm'),
    { ssr: false }
  ) as DynamicCommonForm<T>;
