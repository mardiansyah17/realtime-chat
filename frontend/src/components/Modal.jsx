import { API_URL } from "@/contstant";
import useModal from "@/hooks/useModal";
import { setMessages } from "@/redux/messagesSlice";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Modal({ token }) {
  const { isOpen, onClose } = useModal();
  const [email, setEmail] = useState("mardiansyahm12@gmail.com");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const tes = useSelector((state) => state.messages);
  const submitHandler = async (e) => {
    e.preventDefault();
    // return console.log(token);
    const res = await axios
      .post(
        `${API_URL}/user/get-user`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(
          setMessages({
            conversationId: "1",
            user: res.data,
            messages: [],
          })
        );
        onClose();
      })
      .catch((err) => setError(err.response.data.msg));
  };
  return (
    <>
      {isOpen ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black bg-opacity-25 outline-none focus:outline-none">
            <h1 onClick={() => console.log(tes)}>klikl</h1>
            <form
              onSubmit={submitHandler}
              className="relative flex flex-col w-4/5 p-3 bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none "
            >
              <div className="w-full p-1 mb-4">
                <input
                  value={email}
                  onChange={(val) => setEmail(val.target.value)}
                  type="text"
                  placeholder="Masukan Email tujuan"
                  className="w-full p-1 border border-green-500 rounded-md outline-none active:border-green-600"
                />
                <span className="block text-red-500">{error}</span>
              </div>
              <div className="flex items-center justify-end border-t border-solid rounded-b border-slate-200">
                <button
                  className="px-3 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                  type="button"
                  onClick={() => onClose(false)}
                >
                  Batal
                </button>
                <button
                  className="px-3 py-2 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                  type="submit"
                >
                  Iya
                </button>
              </div>
            </form>
          </div>
        </>
      ) : null}
    </>
  );
}
