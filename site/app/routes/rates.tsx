/* eslint-disable @typescript-eslint/ban-ts-comment */
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
// eslint-disable-next-line import/no-unresolved
import { FramedContent } from "~/components/FramedContent";
type LoaderData =
    | {
          rates: {
              usd: number | null;
              cad: number | null;
              ustd_trc_20: number | null;
              mlc: number | null;
          };
      }
    | {
          error: string | null;
      };

/*
statistics
CAD
MLC
USDT_TRC20
USD
avg
*/
interface API_RESULT {
    statistics: {
        USD?: { median?: number };
        CAD?: { median?: number };
        USDT_TRC20?: { median?: number };
        MLC?: { median?: number };
    };
}
export async function loader() {
    let res: Response;
    let _error: string | null = null;
    let data: API_RESULT;
    try {
        res = await fetch("https://api.cambiocuba.money/api/v1/x-rates?token=aCY78gC3kWRv1pR7VfgSlg");
        data = (await res.json()) as API_RESULT;
        return json<LoaderData>({
            rates: {
                usd: data?.statistics?.USD?.median || null,
                cad: data?.statistics?.CAD?.median || null,
                ustd_trc_20: data?.statistics?.USDT_TRC20?.median || null,
                mlc: data?.statistics?.MLC?.median || null,
            },
        });
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        _error = error?.message;
    }
    return json<LoaderData>({
        error: _error,
    });
}

export default function Rates() {
    const loaderData = useLoaderData<LoaderData>();
    // @ts-ignore
    if (loaderData?.error) {
        return (
            <div>
                <h1>Failure to load Rates</h1>
                <pre>
                    {/* @ts-ignore */}
                    <code>{loaderData.error}</code>
                </pre>
            </div>
        );
    }
    const { usd, cad, ustd_trc_20, mlc } = loaderData.rates;
    return (
        <FramedContent>
            <h1 className='mt-5 text-3xl font-medium'>Rates in CUP</h1>
            <ul className='mt-5 text-xl font-medium grid gap-2'>
                {usd && (
                    <li>
                        <span>USD: {usd} </span>
                    </li>
                )}
                {cad && (
                    <li>
                        <span>CAD: {cad} </span>
                    </li>
                )}
                {ustd_trc_20 && (
                    <li>
                        <span>USDT_TRC20: {ustd_trc_20} </span>
                    </li>
                )}
                {mlc && (
                    <li>
                        <span>MLC: {mlc} </span>
                    </li>
                )}
            </ul>
        </FramedContent>
    );
}
