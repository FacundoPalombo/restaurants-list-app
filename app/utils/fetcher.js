const fetcher = (...args) => fetch(...args).then((res) => res.json());
const fetcherPlainText = (...args) => fetch(...args).then((res) => res.text());

export default fetcher;
export { fetcherPlainText };
