import axios from "axios";

type Response1Data = {
  code: number;
  data: {
    extrinsic_index: string;
    hash_type: string;
  };
  generated_at: number;
  message: string;
};

type Response2Data = {
  code: number;
  data: {
    from: string;
    to?: { address: string };
    value: string;
  };
  generated_at: number;
  message: string;
};

const headers = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/116.0",
};

const getTransactionDetails = async (hash: string): Promise<{ sender: string; receiver: string | undefined; amount: number }> => {
  const json_data = { hash };
  const response1 = await axios.post<Response1Data>("https://astar.webapi.subscan.io/api/scan/check_hash", json_data, { headers });
  const extrinsicIndexData = {
    extrinsic_index: response1.data.data.extrinsic_index,
  };

  const response2 = await axios.post<Response2Data>("https://astar.webapi.subscan.io/api/scan/evm/transaction", extrinsicIndexData, { headers });
  const sender = response2.data.data.from;
  const receiver = response2.data.data.to?.address;
  const amount = parseInt(response2.data.data.value) * 10 ** -18;

  return { sender, receiver, amount };
};

export { getTransactionDetails };
