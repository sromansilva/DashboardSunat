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
    id: number;
    createdAt: Date;
    tipo: string;
    periodo: string;
    estado: string;
    inconsistenciasJson: Prisma.JsonValue;
    contribuyenteId: number;
    updatedAt: Date;
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
    id: number;
    createdAt: Date;
    tipo: string;
    periodo: string;
    estado: string;
    inconsistenciasJson: Prisma.JsonValue;
    contribuyenteId: number;
    updatedAt: Date;
}) | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
export declare const createDeclaracion: (data: Prisma.DeclaracionUncheckedCreateInput) => Prisma.Prisma__DeclaracionClient<{
    id: number;
    createdAt: Date;
    tipo: string;
    periodo: string;
    estado: string;
    inconsistenciasJson: Prisma.JsonValue;
    contribuyenteId: number;
    updatedAt: Date;
}, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
export declare const updateDeclaracion: (id: number, data: Prisma.DeclaracionUncheckedUpdateInput) => Prisma.Prisma__DeclaracionClient<{
    id: number;
    createdAt: Date;
    tipo: string;
    periodo: string;
    estado: string;
    inconsistenciasJson: Prisma.JsonValue;
    contribuyenteId: number;
    updatedAt: Date;
}, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
export declare const deleteDeclaracion: (id: number) => Prisma.Prisma__DeclaracionClient<{
    id: number;
    createdAt: Date;
    tipo: string;
    periodo: string;
    estado: string;
    inconsistenciasJson: Prisma.JsonValue;
    contribuyenteId: number;
    updatedAt: Date;
}, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
//# sourceMappingURL=declaraciones.service.d.ts.map