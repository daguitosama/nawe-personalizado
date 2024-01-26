import { neon } from "@neondatabase/serverless";
var sql: ReturnType<typeof neon>;
export function get_sql(): ReturnType<typeof neon> {
    if (sql) return sql;
    sql = neon(globalThis.DB_URL);
    return sql;
}
