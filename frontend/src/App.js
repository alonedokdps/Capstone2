import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import "./App.scss";
import moment from "moment";
import Layout from "./Layout/Layout";
import Detail from "./Pages/detail/Detail";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import ApiEventType from "./api/EventType.api";
import getAllEventApi from "./api/AllEvent.api";
import ReactToastify from "./Components/react-toastify/ReactToastify";
import AddEvent from "./Pages/AddEvent/AddEvent";
import {useEffect, useState} from "react";
import ScrollToTop from "./Components/ScrollTop/ScrollToTop";
import UserPage from "./Pages/User/UserPage";
import {
  FcHome,
  FcCustomerSupport,
  FcCollaboration,
  FcBinoculars,
  FcLike,
  FcVoicePresentation,
  FcReadingEbook,
} from "react-icons/fc";
import Account from "./Pages/User/Account";
import ApiGetUserById from "./api/GetUserById.api";
import ApiCourses from "./api/Course.api";
import ApiDepartment from "./api/Department.api";
import EventUser from "./Pages/User/EventUser";
import APigetEventByStatus from "./api/GetEventByStatus.api";
import allParticipants from "./api/GetAllParticipants.api";
import ApiDeleteEvent from "./api/DeleteEvent.api";
import {toast} from "react-toastify";
import ApiUpdateStatus from "./api/UpdateStatus.api";
import ApiGetAllAccount from "./api/GetAllAccout.api";

import AlertCustom from "./Components/AlertCustome/AlertCustom";
import CountDown from "./Components/CountDown/CountDown";
import NotfoundPage from "./Components/404/NotfoundPage";
import EventType from "./Pages/EventByEventType/EventType";
import APIventByEventType from "./api/EventByEventType.api";
import AccountManagement from "./Pages/User/AccountManagement";
import ApiuppdateAllow from "./api/uppdateAllow.api";
import ApigetAllAccQuery from "./api/getAllAccQuery.api";
import ApiUpdateRole from "./api/updateRole.api";
import ApideleteAccount from "./api/deleteAccount.api";
import XulyQr from "./Pages/QrafterScancode/XulyQr";

function App() {
  const [totalData, setTotalData] = useState([]);
  const [course, setCourse] = useState([]);
  const [category, setCategory] = useState([]);
  const [user, setUser] = useState([]);
  const [valueFilter, setValueFilter] = useState("");
  const [count, setCount] = useState([]);
  const [pending, setPending] = useState(0);
  const [accept, setAccept] = useState(0);
  const [reject, setReject] = useState(0);
  const [active, setActive] = useState(1);
  const [numberParticipants, setParticipants] = useState([]);
  const [idEvent, setIdEvent] = useState("");
  const [idAccount, setIdAccount] = useState("");
  const [role, setRole] = useState("");
  const [deleteEvent, setDelete] = useState(0);
  const [updateStatus, setUpdateStatus] = useState(0);
  const [userById, setUserById] = useState({});
  const [checked, setChecked] = useState(false);
  const [department, setDepartment] = useState([]);
  const [eventAccepted, setEventAccepted] = useState([]);
  const [ListStudent, setListStudent] = useState([]);
  const [eventId, setEventId] = useState("");
  const [idParticipant, setIdParticipant] = useState("");
  const [queryListstudent, setQueryListStudent] = useState({
    search: "",
    department: "",
  });

  useEffect(() => {
    let controller = new AbortController();
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      return toast("🦄 Hi! For better, please login!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    ApiGetAllAccount.getAllAccount().then((data) => {
      if (data) {
        ApiCourses.getCourses().then((course) => {
          if (course) {
            const newData1 = data.map((item) => {
              course.map((item2) => {
                if (item.courseId === item2._id) {
                  item.courseId = item2.name;
                }
              });
              return item;
            });
            setUser(newData1);
            ApiDepartment.getDepartments().then((department) => {
              if (department) {
                const newData2 = newData1.map((item) => {
                  department.map((item2) => {
                    if (item.departmentId === item2._id) {
                      item.departmentId = item2.name;
                    }
                  });
                  return item;
                });
                setUser((prev) => newData2);
                setDepartment(department);
              }
            });
            ApigetAllAccQuery.getAllAccQuery(
              queryListstudent.search,
              queryListstudent.department
            ).then((data) => {
              if (data) {
                setListStudent(data);
              } else {
                setListStudent([]);
              }
            });
          }
        });
      }
    });
    ApiGetUserById.GetUserById(userData.id).then((data) => {
      if (data) {
        ApiCourses.getCourses().then((course) => {
          if (course) {
            course.filter((item) => {
              if (item._id === data.courseId) {
                ApiDepartment.getDepartments().then((department) => {
                  if (department) {
                    department.filter((item2) => {
                      if (item2._id === data.departmentId) {
                        setUserById({
                          ...data,
                          courseId: item.name,
                          departmentId: item2.name,
                          birthday: moment(data.birthday).format("YYYY-MM-DD"),
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
    return () => controller?.abort();
  }, [
    queryListstudent.department,
    queryListstudent.search,
    queryListstudent,
    updateStatus,
  ]);
  // -------------------------------------------------------

  // -----------------------------------------------------
  useEffect(() => {
    const abortController = new AbortController();
    ApiEventType.getEventType()
      .then((data) => {
        if (data) {
          const newArr = data.map((item) => {
            if (item.name === "Seminars") {
              item = {
                ...item,
                path: `${item.name}`,
                icon: <FcCustomerSupport />,
              };
            } else if (item.name === "Conferences") {
              item = {
                ...item,
                path: `${item.name}`,
                icon: <FcCollaboration />,
              };
            } else if (item.name === "Trade shows") {
              item = {
                ...item,
                path: `${item.name.replace(/\s+/g, "")}`,
                icon: <FcBinoculars />,
              };
            } else if (item.name === "Festivals") {
              item = {
                ...item,
                path: `${item.name.replace(/\s+/g, "")}`,
                icon: <FcLike />,
              };
            } else if (item.name === "Reunions") {
              item = {
                ...item,
                path: `${item.name.replace(/\s+/g, "")}`,
                icon: <FcVoicePresentation />,
              };
            } else if (item.name === "Workshops") {
              item = {
                ...item,
                path: `${item.name.replace(/\s+/g, "")}`,
                icon: <FcReadingEbook />,
              };
            }

            return item;
          });

          setCategory(newArr);
        }
      })
      .then((err) => console.log(err));
    getAllEventApi
      .getAllEvent()
      .then((data) => setCount(data))
      .catch((err) => console.log(err));

    APigetEventByStatus.getEventByStatus(valueFilter)
      .then((data) => {
        if (data.event) {
          ApiEventType.getEventType().then((type) => {
            if (type) {
              const cloneData = [...data.event];
              const newData = cloneData.map((item) => {
                item.dateOfEvent = moment(item.dateOfEvent).format(
                  "DD/MM/YYYY"
                );
                type.map((item2) => {
                  if (item.eventTypeId === item2._id) {
                    item.eventTypeId = item2.name;
                  }
                });
                return item;
              });

              setTotalData(newData);
            }
          });
        } else {
          setTotalData([]);
        }
      })
      .catch((err) => console.log(err));

    allParticipants
      .getAllParticipants(idEvent)
      .then((data) => {
        if (data) {
          setParticipants(data);
        }
      })
      .catch((err) => console.log(err));
    return () => {
      abortController.abort();
    };
  }, [valueFilter, idEvent, deleteEvent, updateStatus]);
  useEffect(() => {
    const abortController = new AbortController();
    APigetEventByStatus.getEventByStatus("Accept")
      .then((data) => {
        if (data) {
          setAccept(data.event?.length);
          ApiEventType.getEventType().then((eventype) => {
            if (data && eventype) {
              const newData = data.event.map((event) => {
                eventype.map((eventype) => {
                  if (event.eventTypeId === eventype._id) {
                    event.eventTypeId = eventype.name;
                  }
                });
                return event;
              });
              setEventAccepted(newData);
            }
          });
        } else {
          setAccept(0);
        }
      })
      .catch((err) => console.log(err));
    APigetEventByStatus.getEventByStatus("Pending")
      .then((data) => {
        if (data) {
          setPending(data.event?.length);
        } else {
          setPending(0);
        }
      })
      .catch((err) => console.log(err));
    APigetEventByStatus.getEventByStatus("Reject")
      .then((data) => {
        if (data) {
          setReject(data.event?.length);
        } else {
          setReject(0);
        }
      })
      .catch((err) => console.log(err));
    return () => {
      abortController.abort();
    };
  }, [updateStatus, deleteEvent]);
  const selectEvent = (e) => {
    setIdEvent(e.target.dataset.value);
  };

  const handleDeleteEvent = (id) => {
    ApiDeleteEvent.DeleteEvent(id).then((data) => {
      if (data.success) {
        setDelete((prev) => deleteEvent + 1);
        toast(data.message);
      }
    });
  };
  const updateAllow = () => {
    setChecked(!checked);
    ApiuppdateAllow.uppdateAllow(idEvent).then((data) => {
      if (data) {
        toast(data.message);
        setUpdateStatus(updateStatus + 1);
      }
    });
  };
  const UpdateStatusEvent = (e) => {
    if (!idEvent) {
      alert("You are not choosing a  event");
      return;
    }

    ApiUpdateStatus.UpdateStatus(idEvent, e.target.value).then((data) => {
      if (data.success) {
        toast(data.message);
        setUpdateStatus(updateStatus + 1);
      }
    });
  };
  const handleChangeFilter = (e) => {
    setValueFilter(e.target.dataset.value);

    switch (e.target.dataset.value) {
      case "":
        setActive(1);

        break;
      case "Accept":
        setActive(2);
        break;
      case "Pending":
        setActive(3);
        break;
      case "Reject":
        setActive(4);
        break;
      case "Expired":
        setActive(5);
        break;
      case "Deleted":
        setActive(6);
        break;
      default:
        setActive(1);
    }
  };
  const UpdateRole = (e) => {
    ApiUpdateRole.UpdateRole(
      e.target.getAttribute("data-id"),
      e.target.value
    ).then((data) => {
      if (data && data.success) {
        toast(data.message);
        setUpdateStatus(updateStatus + 1);
      }
    });
  };
  const deleteAccount = (id) => {
    ApideleteAccount.deleteAccount(id).then((data) => {
      if (data.success) {
        toast(data.message);
        setUpdateStatus(updateStatus + 1);
      }
    });
  };
  const handleChangeQueryListStudent = (e) => {
    setQueryListStudent({...queryListstudent, [e.target.name]: e.target.value});
  };
  return (
    <>
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route path="*" element={<NotfoundPage />} />
            <Route
              path="/"
              element={
                <Layout
                  role={role}
                  category={category}
                  setRole={setRole}
                  data={totalData}
                />
              }
            >
              <Route index element={<Home eventAccepted={eventAccepted} />} />
              {category &&
                category.map((item) => (
                  <Route
                    path={item.path}
                    element={<EventType category={category} />}
                  />
                ))}
            </Route>
            <Route path="/login" element={<Login getForm="login" />} />{" "}
            <Route
              path="detail/:id"
              element={
                <Detail
                  setEventId={setEventId}
                  setIdParticipant={setIdParticipant}
                  setUpdateStatus={setUpdateStatus}
                  updateStatus={updateStatus}
                  category={category}
                />
              }
            />
            <Route
              path="/Qrprocess"
              element={
                <XulyQr
                  updateStatus={updateStatus}
                  setUpdateStatus={setUpdateStatus}
                />
              }
            />
            <Route path="/register" element={<Login getForm="register" />} />
            <Route path="/add-event" element={<AddEvent />} />
            <Route path="/user" element={<UserPage />}>
              <Route
                path="management-account"
                element={
                  <AccountManagement
                    handleChangeQueryListStudent={handleChangeQueryListStudent}
                    ChangeId={UpdateRole}
                    ListStudent={ListStudent}
                    nameTable={queryListstudent.department}
                    department={department}
                    deleteAccount={deleteAccount}
                  />
                }
              />
              <Route
                index
                path="account"
                element={
                  <Account user={user} userById={userById} course={course} />
                }
              />
              {/* <Route path="edit" element={<h1>a</h1>} /> */}
              <Route
                path="event"
                element={
                  <EventUser
                    checked={checked}
                    updateAllow={updateAllow}
                    handleChangeFilter={handleChangeFilter}
                    valueFilter={valueFilter}
                    setValueFilter={setValueFilter}
                    totalEvent={totalData}
                    count={count}
                    pending={pending}
                    accept={accept}
                    reject={reject}
                    active={active}
                    setActive={setActive}
                    numberParticipants={numberParticipants}
                    selectEvent={selectEvent}
                    idEvent={idEvent}
                    handleDeleteEvent={handleDeleteEvent}
                    UpdateStatusEvent={UpdateStatusEvent}
                    user={user}
                    setChecked={setChecked}
                  />
                }
              />
            </Route>
          </Routes>
        </ScrollToTop>

        <ReactToastify />
      </BrowserRouter>
    </>
  );
}

export default App;
