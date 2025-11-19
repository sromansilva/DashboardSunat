import { Prisma } from '@prisma/client';
export declare const listFiscalizaciones: () => Prisma.PrismaPromise<{
    id: number;
    sector: string;
    riesgo: string;
    estado: string;
    descripcion: string;
    fechaRegistro: Date;
}[]>;
export declare const getFiscalizacionById: (id: number) => Prisma.Prisma__FiscalizacionClient<{
    id: number;
    sector: string;
    riesgo: string;
    estado: string;
    descripcion: string;
    fechaRegistro: Date;
} | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
export declare const createFiscalizacion: (data: Prisma.FiscalizacionCreateInput) => Prisma.Prisma__FiscalizacionClient<{
    id: number;
    sector: string;
    riesgo: string;
    estado: string;
    descripcion: string;
    fechaRegistro: Date;
}, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
export declare const updateFiscalizacion: (id: number, data: Prisma.FiscalizacionUpdateInput) => Prisma.Prisma__FiscalizacionClient<{
    id: number;
    sector: string;
    riesgo: string;
    estado: string;
    descripcion: string;
    fechaRegistro: Date;
}, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
export declare const deleteFiscalizacion: (id: number) => Prisma.Prisma__FiscalizacionClient<{
    id: number;
    sector: string;
    riesgo: string;
    estado: string;
    descripcion: string;
    fechaRegistro: Date;
}, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
//# sourceMappingURL=fiscalizacion.service.d.ts.map