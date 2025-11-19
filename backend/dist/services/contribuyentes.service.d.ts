import { Prisma } from '@prisma/client';
export declare const listContribuyentes: () => Prisma.PrismaPromise<({
    declaraciones: {
        id: number;
        createdAt: Date;
        tipo: string;
        periodo: string;
        estado: string;
        inconsistenciasJson: Prisma.JsonValue;
        contribuyenteId: number;
        updatedAt: Date;
    }[];
} & {
    id: number;
    estado: string;
    ruc: string;
    nombre: string;
    actividadEconomica: string;
    historialJson: Prisma.JsonValue;
})[]>;
export declare const getContribuyenteById: (id: number) => Prisma.Prisma__ContribuyenteClient<({
    declaraciones: {
        id: number;
        createdAt: Date;
        tipo: string;
        periodo: string;
        estado: string;
        inconsistenciasJson: Prisma.JsonValue;
        contribuyenteId: number;
        updatedAt: Date;
    }[];
} & {
    id: number;
    estado: string;
    ruc: string;
    nombre: string;
    actividadEconomica: string;
    historialJson: Prisma.JsonValue;
}) | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
export declare const getHistorialContribuyente: (id: number) => Prisma.Prisma__ContribuyenteClient<{
    ruc: string;
    nombre: string;
    historialJson: Prisma.JsonValue;
} | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
export declare const createContribuyente: (data: Prisma.ContribuyenteCreateInput) => Prisma.Prisma__ContribuyenteClient<{
    id: number;
    estado: string;
    ruc: string;
    nombre: string;
    actividadEconomica: string;
    historialJson: Prisma.JsonValue;
}, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
export declare const updateContribuyente: (id: number, data: Prisma.ContribuyenteUpdateInput) => Prisma.Prisma__ContribuyenteClient<{
    id: number;
    estado: string;
    ruc: string;
    nombre: string;
    actividadEconomica: string;
    historialJson: Prisma.JsonValue;
}, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
export declare const deleteContribuyente: (id: number) => Prisma.Prisma__ContribuyenteClient<{
    id: number;
    estado: string;
    ruc: string;
    nombre: string;
    actividadEconomica: string;
    historialJson: Prisma.JsonValue;
}, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
//# sourceMappingURL=contribuyentes.service.d.ts.map