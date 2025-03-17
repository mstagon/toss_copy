// hooks/useStockData.js
import { useState, useEffect } from 'react';

export function useStockData(stockType = 'domestic/trade-value') {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStocks = async () => {
      setLoading(true);
      setError(null);

      try {
        const baseUrl = 'http://localhost:8080/api/stocks';

        const url = `${baseUrl}/${stockType}`;

        console.log(`Fetching stock data from: ${url}`);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        console.log('API Response:', data);

        if (data && data.resultCode === '0' && Array.isArray(data.stocks)) {
          const formattedStocks = data.stocks.map((stock, index) => ({
            rank: stock.rank || index + 1,
            stockCode: stock.code,
            stockName: stock.name,
            price: formatPrice(stock.price),
            change: formatChange(stock.change),
            changePercentage: formatPercentage(stock.changeRate),
            isPositiveChange:
              stock.isPositiveChange !== undefined
                ? stock.isPositiveChange
                : !stock.change.startsWith('-'),
            isFavorite: false,
          }));

          setStocks(formattedStocks);
        } else {
          console.error('Invalid API response structure:', data);
          throw new Error('서버에서 잘못된 데이터 형식이 반환되었습니다.');
        }
      } catch (err) {
        console.error('Failed to fetch stock data:', err);
        setError(
          err.message || '주식 데이터를 불러오는 중 오류가 발생했습니다.',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, [stockType]);

  const formatPrice = (price) => {
    if (!price) return '0원';

    const numericPrice = price.replace(/[^\d.-]/g, '');

    const formattedPrice = parseInt(numericPrice).toLocaleString();

    return `${formattedPrice}원`;
  };

  const formatChange = (change) => {
    if (!change) return '0';

    if (change.startsWith('+') || change.startsWith('-')) {
      return change;
    }

    const numericChange = parseFloat(change);
    return numericChange >= 0 ? `+${change}` : change;
  };

  const formatPercentage = (percentage) => {
    if (!percentage) return '0%';

    let cleanPercentage = percentage.replace(/%/g, '');

    if (cleanPercentage.startsWith('+') || cleanPercentage.startsWith('-')) {
      return `${cleanPercentage}%`;
    }

    const numericPercentage = parseFloat(cleanPercentage);
    return numericPercentage >= 0
      ? `+${cleanPercentage}%`
      : `${cleanPercentage}%`;
  };

  return { stocks, loading, error };
}
