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
        createdAt: Date;
        id: number;
        tipo: string;
        periodoInicio: Date;
        periodoFin: Date;
        formato: string;
        metadata: Prisma.JsonValue | null;
        generadoPorId: number | null;
    };
    exportUrl: string;
}>;
export declare const getReporteById: (id: number) => Prisma.Prisma__ReportClient<({
    generadoPor: {
        role: import("@prisma/client").$Enums.UserRole;
        username: string;
        passwordHash: string;
        email: string;
        createdAt: Date;
        id: number;
    } | null;
} & {
    createdAt: Date;
    id: number;
    tipo: string;
    periodoInicio: Date;
    periodoFin: Date;
    formato: string;
    metadata: Prisma.JsonValue | null;
    generadoPorId: number | null;
}) | null, null, import("@prisma/client/runtime/library").DefaultArgs, {
    log: ("error" | "warn")[];
}>;
export {};
//# sourceMappingURL=reportes.service.d.ts.map