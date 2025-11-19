import { Prisma } from '@prisma/client';
export interface RecaudacionFilters {
    periodo?: string;
    departamento?: string;
    tipoContribuyente?: string;
    regimen?: string;
}
export declare const listRecaudacion: (filters: RecaudacionFilters) => Promise<{
    id: number;
    periodo: string;
    departamento: string;
    tipoContribuyente: string;
    regimen: string;
    monto: Prisma.Decimal;
    creadoEl: Date;
}[]>;
export declare const getRecaudacionById: (id: number) => Prisma.Prisma__RecaudacionClient<{
    id: number;
    periodo: string;
    departamento: string;
    tipoContribuyente: string;
    regimen: string;
    monto: Prisma.Decimal;
    creadoEl: Date;
} | null, null, import("@prisma/client/runtime/library").DefaultArgs, {
    log: ("error" | "warn")[];
}>;
export declare const createRecaudacion: (data: Prisma.RecaudacionCreateInput) => Prisma.Prisma__RecaudacionClient<{
    id: number;
    periodo: string;
    departamento: string;
    tipoContribuyente: string;
    regimen: string;
    monto: Prisma.Decimal;
    creadoEl: Date;
}, never, import("@prisma/client/runtime/library").DefaultArgs, {
    log: ("error" | "warn")[];
}>;
export declare const updateRecaudacion: (id: number, data: Prisma.RecaudacionUpdateInput) => Prisma.Prisma__RecaudacionClient<{
    id: number;
    periodo: string;
    departamento: string;
    tipoContribuyente: string;
    regimen: string;
    monto: Prisma.Decimal;
    creadoEl: Date;
}, never, import("@prisma/client/runtime/library").DefaultArgs, {
    log: ("error" | "warn")[];
}>;
export declare const deleteRecaudacion: (id: number) => Prisma.Prisma__RecaudacionClient<{
    id: number;
    periodo: string;
    departamento: string;
    tipoContribuyente: string;
    regimen: string;
    monto: Prisma.Decimal;
    creadoEl: Date;
}, never, import("@prisma/client/runtime/library").DefaultArgs, {
    log: ("error" | "warn")[];
}>;
//# sourceMappingURL=recaudacion.service.d.ts.map