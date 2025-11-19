import { Prisma } from '@prisma/client';
interface ReporteInput {
    tipo: string;
    periodoInicio: Date;
    periodoFin: Date;
    formato: string;
    metadata?: Prisma.InputJsonValue;
}
export declare const createReporte: (input: ReporteInput, generadoPorId?: number) => Promise<{
    reporte: {
        id: number;
        createdAt: Date;
        tipo: string;
        periodoInicio: Date;
        periodoFin: Date;
        formato: string;
        generadoPorId: number | null;
        metadata: Prisma.JsonValue | null;
    };
    exportUrl: string;
}>;
export declare const getReporteById: (id: number) => Prisma.Prisma__ReportClient<({
    generadoPor: {
        id: number;
        username: string;
        passwordHash: string;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        createdAt: Date;
    } | null;
} & {
    id: number;
    createdAt: Date;
    tipo: string;
    periodoInicio: Date;
    periodoFin: Date;
    formato: string;
    generadoPorId: number | null;
    metadata: Prisma.JsonValue | null;
}) | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
export {};
//# sourceMappingURL=reportes.service.d.ts.map