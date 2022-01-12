import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToUserWatchlist,
  removeFromUserWatchlist,
} from "../../store/slices/watchlistSlice";

export default function useSetFavoriteItem(isFav, uuid, name) {
  //redux
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.authApi.currentUser);
  const { isFavCryptosFetched } = useSelector((state) => state.watchlistApi); // to handle rendering icons after favCryptos list is fetched to prevent the user from re-selecting already-selected cryptos

  const isUserExist = currentUser ? true : false;

  //states
  const [isFavCrypto, setIsFavCrypto] = useState(isFav);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  //side effects
  useEffect(() => {
    setIsFavCrypto(isFav);
  }, [isFav]);

  //functions
  const adder = async () => {
    try {
      setIsLoading(true);
      await dispatch(
        addToUserWatchlist({
          userId: currentUser.userId,
          newFavCrypto: { coinId: uuid, name: name },
        })
      );
      setIsLoading(false);
      setIsFavCrypto(!isFavCrypto);
    } catch (err) {
      setError(err);
    }
  };

  const remover = async () => {
    try {
      setIsLoading(true);
      await dispatch(
        removeFromUserWatchlist({
          userId: currentUser.userId,
          removeCryptoId: uuid,
        })
      );
      setIsLoading(false);
      setIsFavCrypto(!isFavCrypto);
    } catch (err) {
      setError(err);
    }
  };

  return {
    isLoading,
    isFavCrypto,
    isUserExist,
    isFavCryptosFetched,
    adder,
    remover,
  };
}
