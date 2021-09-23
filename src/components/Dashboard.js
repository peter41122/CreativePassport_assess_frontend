import React, { useState, useEffect } from "react";
import { DatePickerInput } from 'rc-datepicker';
import Moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { uploadData, getAll, deleteRecord } from "../actions/board";

import 'rc-datepicker/lib/style.css';

function Dashboard() {

  const dispatch = useDispatch()
  const store = useSelector(state => state.board);

  const options = [
    { label: "Rock", value: "rock" },
    { label: "Jazz", value: "jazz" },
    { label: "Pop", value: "pop" },
    { label: "Dance", value: "dance" },
    { label: "Rhythm", value: "rhythm" },
    { label: "Soul", value: "soul" },
    { label: "Hip hop", value: "hiphop" },
  ];
  const uploadlistHeader = ['Name', 'Birthday', 'Interest', 'Music', 'Act'];

  const [birthday, setBirthDay] = useState('2021-09-22');
  const [interests, setInterests] = useState('Rock');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [myMusic, setMusic] = useState('');


  useEffect(() => {
    dispatch(getAll());
  }, [dispatch])

  const onFileChange = (e) => {
    setMusic(e.target.files[0]);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("birthday", birthday);
    formData.append("interests", interests);
    formData.append("music", myMusic);

    dispatch(uploadData(formData));
  }

  const isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  const onDeleteItem = (id) => {
    if (window.confirm('Are you sure you wish to delete this item?'))
      dispatch(deleteRecord(id));
  }

  const onPlayMusic = () => {
    console.log("play music");
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/3 xl:w-1/3 justify-center p-6">
          <form className="pt-6 pb-8 mb-4 bg-white rounded" onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3 flex col">
              <div className="mt-2 w-1/3 text-left">
                <label className="block mb-2 font-bold text-gray-700" htmlFor="firstName">
                  First Name
                </label>
              </div>
              <div className="w-2/3">
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  required
                  onChange={e => setFirstName(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-3 flex col">
              <div className="mt-2 w-1/3 text-left">
                <label className="block mb-2 font-bold text-gray-700" htmlFor="lastName">
                  Last Name
                </label>
              </div>
              <div className="w-2/3">
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  required
                  onChange={e => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-3 flex col">
              <div className="mt-2 w-1/3 text-left">
                <label className="block mb-2 font-bold text-gray-700" htmlFor="birthDay">
                  Date of Birth
                </label>
              </div>
              <div className="w-2/3">
                <DatePickerInput
                  onChange={(jsDate, strDate) => { setBirthDay(strDate) }}
                  value={birthday}
                  className='my-custom-datepicker-component'
                  returnFormat='YYYY-MM-DD'
                  showOnInputClick
                />
              </div>
            </div>
            <div className="mb-3 flex col">
              <div className="mt-2 w-1/3 text-left">
                <label className="block mb-2 font-bold text-gray-700" htmlFor="interests">
                  Interests
                </label>
              </div>
              <div className="w-2/3 text-left">
                <select className="form-select text-sm block w-full border rounded shadow"
                  value={interests}
                  onChange={e => setInterests(e.target.value)}
                >
                  {options.map((item) => {
                    return (
                      <option value={item.value} key={item.value}>{item.label}</option>
                    )
                  })}
                </select>
              </div>
            </div>
            <div className="mb-3 flex col">
              <div className="mt-2 w-1/3 text-left">
                <label className="block mb-2 font-bold text-gray-700" htmlFor="fileUpload">
                  Upload Music
                </label>
              </div>
              <div className="w-2/3 text-left">
                <div className="block mt-2 font-bold text-gray-700">
                  <input type="file" onChange={(e) => onFileChange(e)} />
                </div>
              </div>
            </div>
            <hr className="mt-6 mb-6 border-t" />
            <div className="mb-6 mt-6 text-center">
              <button
                className="w-1/2 px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="w-full lg:w-2/3 xl:w-2/3 p-6 pt-8">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-y-auto border-b border-gray-200 sm:rounded-lg mb-5" style={{ height: "16em" }}>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 justify-center">
                    <tr>
                      {uploadlistHeader.map((value, key) => {
                        return (
                          <th scope="col" key={key} className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {value}
                          </th>
                        )
                      })}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {isEmpty(store.data) && <tr><td colSpan="5"><p className="text-gray-700 pt-5">Unfortunately, data does not exist.</p></td></tr>}
                    {!isEmpty(store.data) && store.data.map((value, key) => {
                      return (
                        <tr key={key}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {value.firstname + ' ' + value.lastname}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-left">
                            <div className="text-sm text-gray-500">
                              {Moment(value.birthday).format('YYYY-MM-DD')}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-left">
                            <div className="text-sm text-gray-500">
                              {value.interests}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-left">
                            <div
                              className="text-sm text-gray-500 cursor-pointer hover:underline"
                              title={value.mutitle}
                              onClick={onPlayMusic}
                            >
                              {value.mutitle.substr(0, 20) + " ..."}
                            </div>
                          </td>
                          <td className="whitespace-nowrap text-center">
                            <span
                              id={value.id}
                              className="text-red-400 hover:text-gray-100 cursor-pointer"
                              onClick={(e) => onDeleteItem(e.currentTarget.id)}
                            >
                              <i className="material-icons-round text-base">delete_outline</i>
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div>
                <figure>
                  <figcaption>Listen to the T-Rex:</figcaption>
                  <audio
                    controls
                    src="/media/cc0-audio/t-rex-roar.mp3">
                    Your browser does not support the
                    <code>audio</code> element.
                  </audio>
                </figure>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;