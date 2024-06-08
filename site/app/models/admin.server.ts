import { Admin } from "schema/types/admin"
import { get_sql } from "~/lib/db.server"

class DB_Error extends Error{};
type Success_Model_Operation_Result = {
    data: {admin: Admin | null},
    error: null
}
type Success_Model_Operation_Result = {
    data: any,
    error: DB_Error
}
type Model_Operation_Result = Success_Model_Operation_Result | Success_Model_Operation_Result;
async function get_admin (username: string) : Promise<Model_Operation_Result>{
  const sql = get_sql();
  const rows = await sql`select * from admins;`;
  if(rows.length)
}

export {}