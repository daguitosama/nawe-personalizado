import z from "zod";
const ENV_SCHEMA = z.object({
    COOKIE_SECRET: z.string(),
    ST_ACCESS_TOKEN: z.string(),
});
export type Env = z.infer<typeof ENV_SCHEMA>;

let _env: z.infer<typeof ENV_SCHEMA> = {
    COOKIE_SECRET: "",
    ST_ACCESS_TOKEN: "",
};

export function init_env(env_data: Env) {
    _env = ENV_SCHEMA.parse(env_data);
}
export default function env() {
    return _env;
}
