"use client";

import React, { Fragment, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonThird from "@/shared/Button/ButtonThird";
import ButtonClose from "@/shared/ButtonClose/ButtonClose";
import Checkbox from "@/shared/Checkbox/Checkbox";
import Slider from "rc-slider";
import Radio from "@/shared/Radio/Radio";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Locate, MapPinIcon, TagsIcon } from "lucide-react";
import { toast } from "react-toastify";
import { all } from "axios";
import { useMutation } from "react-query";
import { GraphQLResult, generateClient } from "aws-amplify/api";
import {
  fetchBusinessProfiles,
  individualBusinessProfileReturnType,
} from "@/utils/data/fetchBusinessProfiles";
import { usePathname, useRouter } from "next/navigation";
import { fetchLikedBusinessProfiles } from "@/utils/data/fetchLikedBusinessProfiles";

const client = generateClient();

// DEMO DATA
const allStates = [
  {
    name: "Alabama",
  },
  {
    name: "Alaska",
  },
  {
    name: "Arizona",
  },
  {
    name: "Arkansas",
  },
  {
    name: "California",
  },
  {
    name: "Colorado",
  },
  {
    name: "Connecticut",
  },
  {
    name: "Delaware",
  },
  {
    name: "Florida",
  },
  {
    name: "Georgia",
  },
  {
    name: "Hawaii",
  },
  {
    name: "Idaho",
  },
  {
    name: "Illinois",
  },
  {
    name: "Indiana",
  },
  {
    name: "Iowa",
  },
  {
    name: "Kansas",
  },
  {
    name: "Kentucky",
  },
  {
    name: "Louisiana",
  },
  {
    name: "Maine",
  },
  {
    name: "Maryland",
  },
  {
    name: "Massachusetts",
  },
  {
    name: "Michigan",
  },
  {
    name: "Minnesota",
  },
  {
    name: "Mississippi",
  },
  {
    name: "Missouri",
  },
  {
    name: "Montana",
  },
  {
    name: "Nebraska",
  },
  {
    name: "Nevada",
  },
  {
    name: "New Hampshire",
  },
  {
    name: "New Jersey",
  },
  {
    name: "New Mexico",
  },
  {
    name: "New York",
  },
  {
    name: "North Carolina",
  },
  {
    name: "North Dakota",
  },
  {
    name: "Ohio",
  },
  {
    name: "Oklahoma",
  },
  {
    name: "Oregon",
  },
  {
    name: "Pennsylvania",
  },
  {
    name: "Rhode Island",
  },
  {
    name: "South Carolina",
  },
  {
    name: "South Dakota",
  },
  {
    name: "Tennessee",
  },
  {
    name: "Texas",
  },
  {
    name: "Utah",
  },
  {
    name: "Vermont",
  },
  {
    name: "Virginia",
  },
  {
    name: "Washington",
  },
  {
    name: "West Virginia",
  },
  {
    name: "Wisconsin",
  },
  {
    name: "Wyoming",
  },
];

//

interface TabFiltersProps {
  userId: string;
  setAllBusinessProfiles: React.Dispatch<
    React.SetStateAction<individualBusinessProfileReturnType[]>
  >;
}

function TabFilters({ userId, setAllBusinessProfiles }: TabFiltersProps) {
  const pathname = usePathname();

  const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false);

  const [stateTypeStates, setSaleTypeStates] = useState<string[]>([]);
  const [sortOrderStates, setSortOrderStates] = useState<string>("");

  const [tags, setTags] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const filterMutation = useMutation(
    async () => {
      if (pathname === "/search") {
        const res = await fetchBusinessProfiles({
          userId,
          tags,
          businessStates: stateTypeStates,
        });
        return res;
      } else if (pathname === "/home") {
        const res = await fetchLikedBusinessProfiles({
          userId,
          tags,
          businessStates: stateTypeStates,
        });
        return res;
      }

      return [];
    },
    {
      onError: (err: Error) => {
        toast(err.message, {
          autoClose: 3000,
          type: "error",
          position: "bottom-right",
        });
      },
      onSuccess: (data) => {
        console.log(data);

        setAllBusinessProfiles(data);
      },
    }
  );

  //
  const closeModalMoreFilter = () => setisOpenMoreFilter(false);
  const openModalMoreFilter = () => setisOpenMoreFilter(true);

  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    } else {
      toast("Duplicate tag not allowed", {
        autoClose: 3000,
        type: "error",
        position: "bottom-right",
      });
    }
  };

  const editTag = (index: number, newTag: string) => {
    const newTags = [...tags];
    newTags[index] = newTag;
    setTags(newTags);
  };

  const deleteTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleAddTag = () => {
    if (!isEditing) {
      addTag(input);
    } else {
      if (editIndex !== null) {
        editTag(editIndex, input);
      }
      setIsEditing(false);
      setEditIndex(null);
    }
    setInput("");
  };

  const handleEditTag = (index: number) => {
    setInput(tags[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  //

  // OK
  const renderXClear = () => {
    return (
      <span className="flex-shrink-0 w-4 h-4 rounded-full bg-primary-500 text-white flex items-center justify-center ml-3 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  };

  // OK
  const renderTabsStates = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none
               ${
                 open
                   ? "!border-primary-500 "
                   : "border-neutral-300 dark:border-neutral-700"
               }
                ${
                  !!sortOrderStates.length
                    ? "!border-primary-500 bg-primary-50 text-primary-900"
                    : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500"
                }
                `}
            >
              <MapPinIcon />

              <span className="ml-2">States</span>
              {!sortOrderStates.length ? (
                <ChevronDownIcon className="w-4 h-4 ml-3" />
              ) : (
                <span onClick={() => setSortOrderStates("")}>
                  {renderXClear()}
                </span>
              )}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                <div className="h-52 overflow-auto rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    <Checkbox
                      name="All States"
                      label="All States"
                      defaultChecked={
                        stateTypeStates.length === allStates.length
                      }
                      onChange={(checked) => {
                        if (checked === true) {
                          setSaleTypeStates(allStates.map((i) => i.name));
                        } else {
                          setSaleTypeStates([]);
                        }
                      }}
                    />
                    <div className="w-full border-b border-neutral-200 dark:border-neutral-700" />
                    {allStates.map((item) => {
                      return (
                        <div key={item.name} className="">
                          <Checkbox
                            name={item.name}
                            label={item.name}
                            defaultChecked={stateTypeStates.includes(item.name)}
                            onChange={(checked) => {
                              if (checked === true) {
                                setSaleTypeStates((currentStates) => [
                                  ...currentStates,
                                  item.name,
                                ]);
                              } else {
                                setSaleTypeStates((currentStates) =>
                                  currentStates.filter((i) => i !== item.name)
                                );
                              }
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        close();
                        setSaleTypeStates([]);
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={() => {
                        close();

                        filterMutation.mutate();
                      }}
                      disabled={filterMutation.isLoading}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  // OK
  const renderTabsTags = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none 
              ${open ? "!border-primary-500 " : ""}
                ${
                  !!tags.length
                    ? "!border-primary-500 bg-primary-50 text-primary-900"
                    : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500"
                }
                `}
            >
              <TagsIcon />

              <span className="ml-2">Tags</span>
              {!tags.length ? (
                <ChevronDownIcon className="w-4 h-4 ml-3" />
              ) : (
                <span onClick={() => setTags([])}>{renderXClear()}</span>
              )}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                <div className="h-52 overflow-auto rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    <div className="p-5 space-y-4">
                      <input
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={handleAddTag}
                        className="p-2 bg-blue-500 ml-4 text-white rounded-md hover:bg-blue-600"
                      >
                        {isEditing ? "Update Tag" : "Add Tag"}
                      </button>
                      <div className="space-y-2">
                        {tags.map((tag, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <span className="p-2 bg-gray-200 rounded-md">
                              {tag}
                            </span>
                            <button
                              onClick={() => handleEditTag(index)}
                              className="p-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteTag(index)}
                              className="p-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        close();
                        setTags([]);
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={() => {
                        close();

                        filterMutation.mutate();
                      }}
                      disabled={filterMutation.isLoading}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  // OK
  const renderMoreFilterItem = (
    data: {
      name: string;
      description?: string;
      defaultChecked?: boolean;
    }[]
  ) => {
    const list1 = data.filter((_, i) => i < data.length / 2);
    const list2 = data.filter((_, i) => i >= data.length / 2);
    return (
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col space-y-5">
          {list1.map((item) => (
            <Checkbox
              key={item.name}
              name={item.name}
              subLabel={item.description}
              label={item.name}
              defaultChecked={!!item.defaultChecked}
            />
          ))}
        </div>
        <div className="flex flex-col space-y-5">
          {list2.map((item) => (
            <Checkbox
              key={item.name}
              name={item.name}
              subLabel={item.description}
              label={item.name}
              defaultChecked={!!item.defaultChecked}
            />
          ))}
        </div>
      </div>
    );
  };

  // FOR RESPONSIVE MOBILE
  const renderTabMobileFilter = () => {
    return (
      <div className="flex-shrink-0">
        <div
          className={`flex flex-shrink-0 items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-900 focus:outline-none cursor-pointer`}
          onClick={openModalMoreFilter}
        >
          <span>filters</span>
          {renderXClear()}
        </div>

        <Transition appear show={isOpenMoreFilter} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-50 overflow-y-auto"
            onClose={closeModalMoreFilter}
          >
            <div className="min-h-screen text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                className="inline-block py-8 h-screen w-full"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-flex flex-col w-full max-w-4xl text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Filters
                    </Dialog.Title>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalMoreFilter} />
                    </span>
                  </div>

                  <div className="flex-grow overflow-y-auto">
                    <div className="px-8 md:px-10 divide-y divide-neutral-200 dark:divide-neutral-800">
                      {/* --------- */}
                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">State</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(allStates)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        setSaleTypeStates([]);
                        setSortOrderStates("");
                        closeModalMoreFilter();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={() => {
                        closeModalMoreFilter();

                        filterMutation.mutate();
                      }}
                      disabled={filterMutation.isLoading}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    );
  };

  return (
    <div className="flex lg:space-x-4">
      {/* FOR DESKTOP */}
      <div className="hidden lg:flex space-x-4">
        {renderTabsStates()}
        {renderTabsTags()}
      </div>

      {/* FOR RESPONSIVE MOBILE */}
      <div className="flex overflow-x-auto lg:hidden space-x-4">
        {renderTabMobileFilter()}
      </div>
    </div>
  );
}

export default TabFilters;
