import { Prisma } from '@prisma/client';
export declare const listContribuyentes: () => Prisma.PrismaPromise<({
    declaraciones: {
        createdAt: Date;
        id: number;
        periodo: string;
        tipo: string;
        estado: string;
        inconsistenciasJson: Prisma.JsonValue;
        updatedAt: Date;
        contribuyenteId: number;
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
        createdAt: Date;
        id: number;
        periodo: string;
        tipo: string;
        estado: string;
        inconsistenciasJson: Prisma.JsonValue;
        updatedAt: Date;
        contribuyenteId: number;
    }[];
} & {
    id: number;
    estado: string;
    ruc: string;
    nombre: string;
    actividadEconomica: string;
    historialJson: Prisma.JsonValue;
}) | null, null, import("@prisma/client/runtime/library").DefaultArgs, {
    log: ("error" | "warn")[];
}>;
export declare const getHistorialContribuyente: (id: number) => Prisma.Prisma__ContribuyenteClient<{
    ruc: string;
    nombre: string;
    historialJson: Prisma.JsonValue;
} | null, null, import("@prisma/client/runtime/library").DefaultArgs, {
    log: ("error" | "warn")[];
}>;
export declare const createContribuyente: (data: Prisma.ContribuyenteCreateInput) => Prisma.Prisma__ContribuyenteClient<{
    id: number;
    estado: string;
    ruc: string;
    nombre: string;
    actividadEconomica: string;
    historialJson: Prisma.JsonValue;
}, never, import("@prisma/client/runtime/library").DefaultArgs, {
    log: ("error" | "warn")[];
}>;
export declare const updateContribuyente: (id: number, data: Prisma.ContribuyenteUpdateInput) => Prisma.Prisma__ContribuyenteClient<{
    id: number;
    estado: string;
    ruc: string;
    nombre: string;
    actividadEconomica: string;
    historialJson: Prisma.JsonValue;
}, never, import("@prisma/client/runtime/library").DefaultArgs, {
    log: ("error" | "warn")[];
}>;
export declare const deleteContribuyente: (id: number) => Prisma.Prisma__ContribuyenteClient<{
    id: number;
    estado: string;
    ruc: string;
    nombre: string;
    actividadEconomica: string;
    historialJson: Prisma.JsonValue;
}, never, import("@prisma/client/runtime/library").DefaultArgs, {
    log: ("error" | "warn")[];
}>;
//# sourceMappingURL=contribuyentes.service.d.ts.map