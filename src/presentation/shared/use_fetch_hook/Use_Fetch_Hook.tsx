import { autoType, csvParse } from "d3-dsv";
import React, { useEffect, useState } from "react";
//
// BUT IS IT REALLY RIGHT WAY TO DO THIS
// are this performance enough or efficient
// using HOOK to fecth data in react is not recomemended
//

// https://www.robinwieruch.de/react-hooks-fetch-data/
// Note: In the future, React Hooks are not be
// intended for data fetching in React.Instead,
// a feature called Suspense will be in charge for
// it.The following walkthrough is nonetheless a
// great way to learn more about state and effect
// hooks in React.

interface Response {
  data: null | string;
  error: any[];
  is_loading: boolean;
}

interface Fetch_Response {
  response: Response;
  set_url: React.Dispatch<React.SetStateAction<string | null>>;
}

interface Props {
  initiate_data_global_state?: (new_data: any[], columns: string[]) => void;
}

const Use_Fetch_Hook = (
  initiate_data_global_state:
    | ((new_data: any[], columns: string[]) => void)
    | null = null,
  clean_data_global_state: (() => void) | null = null
) => {
  const [data, set_data] = useState<any[] | null>(null);
  const [columns, set_columns] = useState<string[] | null>(null);
  const [url, set_url] = useState<string | null>(null);
  const [is_error, set_is_error] = useState<boolean>(false);
  const [msg_error, set_msg_error] = useState<string | null>(null);
  const [is_loading, set_is_loading] = useState<boolean>(false);

  // EXPERIMENT
  // const set_data_columns_global = (
  //   data: any[],
  //   columns: string[],
  //   initiate_data_global_state:
  //     | ((new_data: any[], columns: string[]) => void)
  //     | null = null
  // ) => {
  //   if (initiate_data_global_state) {
  //   }
  // };
  // EXPERIMENT

  useEffect(() => {
    const fetch_data_string = async () => {
      set_is_error(() => false);
      set_is_loading(() => true);
      try {
        if (url) {
          const response = await fetch(url);
          const data_res_string = await response.text();
          const data_parsed = csvParse(data_res_string, autoType);

          // GLOBAL
          if (initiate_data_global_state && clean_data_global_state) {
            // console.log(initiate_data_global_state);
            clean_data_global_state();
            initiate_data_global_state([...data_parsed], data_parsed.columns);
          }
          // GLOBAL

          // LOCAL
          set_data(() => [...data_parsed]); // BAD HERE SLOW AS F, HAHAHA IDC
          set_columns(() => data_parsed.columns);
          // set_data(() => data_res_string);
          // LOCAL

          set_is_error(() => false);
          set_msg_error(() => null);
        } else {
          throw Error("URL NOT INPUTTED YET, UNDEFINED/NULL");
        }
      } catch (error: any) {
        set_is_error(() => true);
        set_msg_error(() => error.message);
      }
      set_is_loading(() => false);
    };
    fetch_data_string();
  }, [url]);

  return [
    {
      data: { data: data, columns: columns },
      error: [is_error, msg_error],
      is_loading,
    },
    set_url,
  ] as const;
  // return {
  //   response: { data, error: [is_error, msg_error], is_loading },
  //   set_url,
  // };
};

export default Use_Fetch_Hook;
