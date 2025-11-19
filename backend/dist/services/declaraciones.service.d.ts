import { Prisma } from '@prisma/client';
export declare const listDeclaraciones: () => Prisma.PrismaPromise<({
    contribuyente: {
        id: number;
        estado: string;
        ruc: string;
        nombre: string;
        actividadEconomica: string;
        historialJson: Prisma.JsonValue;
    };
} & {
    createdAt: Date;
    id: number;
    periodo: string;
    tipo: string;
    estado: string;
    inconsistenciasJson: Prisma.JsonValue;
    updatedAt: Date;
    contribuyenteId: number;
})[]>;
export declare const getDeclaracionById: (id: number) => Prisma.Prisma__DeclaracionClient<({
    contribuyente: {
        id: number;
        estado: string;
        ruc: string;
        nombre: string;
        actividadEconomica: string;
        historialJson: Prisma.JsonValue;
    };
} & {
    createdAt: Date;
    id: number;
    periodo: string;
    tipo: string;
    estado: string;
    inconsistenciasJson: Prisma.JsonValue;
    updatedAt: Date;
    contribuyenteId: number;
}) | null, null, import("@prisma/client/runtime/library").DefaultArgs, {
    log: ("error" | "warn")[];
}>;
export declare const createDeclaracion: (data: Prisma.DeclaracionUncheckedCreateInput) => Prisma.Prisma__DeclaracionClient<{
    createdAt: Date;
    id: number;
    periodo: string;
    tipo: string;
    estado: string;
    inconsistenciasJson: Prisma.JsonValue;
    updatedAt: Date;
    contribuyenteId: number;
}, never, import("@prisma/client/runtime/library").DefaultArgs, {
    log: ("error" | "warn")[];
}>;
export declare const updateDeclaracion: (id: number, data: Prisma.DeclaracionUncheckedUpdateInput) => Prisma.Prisma__DeclaracionClient<{
    createdAt: Date;
    id: number;
    periodo: string;
    tipo: string;
    estado: string;
    inconsistenciasJson: Prisma.JsonValue;
    updatedAt: Date;
    contribuyenteId: number;
}, never, import("@prisma/client/runtime/library").DefaultArgs, {
    log: ("error" | "warn")[];
}>;
export declare const deleteDeclaracion: (id: number) => Prisma.Prisma__DeclaracionClient<{
    createdAt: Date;
    id: number;
    periodo: string;
    tipo: string;
    estado: string;
    inconsistenciasJson: Prisma.JsonValue;
    updatedAt: Date;
    contribuyenteId: number;
}, never, import("@prisma/client/runtime/library").DefaultArgs, {
    log: ("error" | "warn")[];
}>;
//# sourceMappingURL=declaraciones.service.d.ts.map