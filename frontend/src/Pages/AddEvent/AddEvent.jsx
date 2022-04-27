import React, {useEffect, useState} from "react";
import {useController, useForm, useWatch} from "react-hook-form";
import MyInput from "../../Components/Input/MyInput";
import DropSelect from "../../Components/selectboxcustom/DropSelect";
import MyTextArea from "../../Components/textarea/MyTextArea";
import ApiEventType from "../../api/EventType.api.js";
import ApiEvent from "../../api/AddEvent.api";
import {toast} from "react-toastify";
import "./style.scss";
import HomeButton from "../../Components/rediectHome/HomeButton";
const AddEvent = () => {
  const [EventType, setEventType] = useState([]);

  const [img, setImg] = useState();

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    reset,

    control,
    formState: {errors, dirtyFields, isValid, isSubmitting},
    // resolver: yupResolver(schema),
  } = useForm({mode: "onChange"});

  const onSubmit = (data) => {
    const {
      address,
      budgetOfEvent,
      dateOfEvent,
      description,
      eventTypeId,

      name,
      note,
      organizedBy,
      timeEnd,
      timeStart,
    } = data;
    const formdata = new FormData();
    formdata.append("img", data.img[0]);
    formdata.append("address", address);
    formdata.append("budgetOfEvent", budgetOfEvent);
    formdata.append("dateOfEvent", dateOfEvent);
    formdata.append("description", description);
    formdata.append("eventTypeId", eventTypeId);
    formdata.append("name", name);
    formdata.append("note", note);
    formdata.append("organizedBy", organizedBy);
    formdata.append("timeEnd", timeEnd);
    formdata.append("timeStart", timeStart);

    ApiEvent.addEvent(formdata)
      .then((res) => {
        if (res.status) {
          toast.success(res.message);
          console.log(data);
        }
      })
      .catch((err) => toast.error(err));
  };
  useEffect(() => {
    ApiEventType.getEventType()
      .then((data) => {
        if (data) {
          setEventType(data);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="section-add-event">
      <HomeButton />
      <form onSubmit={handleSubmit(onSubmit)}>
        <>
          {" "}
          <div className="box-input">
            <div className="box-x-input">
              <label htmlFor="name">Name event</label>
              <MyInput
                name="name"
                id="name"
                placeholder="Enter your name event"
                control={control}
                type="text"
              ></MyInput>
            </div>
            <div className="box-x-input">
              <label htmlFor="organizedBy">Organized by</label>
              <MyInput
                name="organizedBy"
                id="organizedBy"
                placeholder="Enter your organization"
                control={control}
                type="text"
              ></MyInput>
            </div>
          </div>
          <div className="box-input">
            <div className="box-x-input">
              <label htmlFor="address">Address</label>
              <MyInput
                name="address"
                id="address"
                placeholder="Enter your address"
                control={control}
                type="text"
              ></MyInput>
            </div>
            <div className="box-x-input">
              <label htmlFor="dateOfEvent">Date of event </label>
              <MyInput
                name="dateOfEvent"
                id="dateOfEvent"
                placeholder="Enter your date"
                control={control}
                type="date"
              ></MyInput>
            </div>
          </div>
          <div className="box-input">
            <div className="box-x-input">
              <label htmlFor="img">Image</label>
              <input
                type="file"
                name="img"
                id="img"
                control={control}
                {...register("img")}
              />
            </div>
          </div>
          <div className="box-input">
            <div className="box-x-input">
              <label htmlFor="eventTypeId">Type event</label>
              <DropSelect
                control={control}
                setValue={setValue}
                name="eventTypeId"
                selectName="type"
                data={EventType}
              ></DropSelect>
            </div>
            <div className="box-x-input">
              <label htmlFor="budgetOfEvent">Budget of event</label>
              <MyInput
                name="budgetOfEvent"
                id="budgetOfEvent"
                placeholder="Enter your budget Of Event"
                control={control}
                type="number"
              ></MyInput>
            </div>
          </div>
          <div className="box-input">
            <div className="box-x-input">
              <label htmlFor="timeStart">Time start</label>
              <MyInput
                name="timeStart"
                id="timeStart"
                control={control}
                type="time"
              ></MyInput>
            </div>
            <div className="box-x-input">
              <label htmlFor="timeEnd">Time end</label>
              <MyInput
                name="timeEnd"
                id="timeEnd"
                control={control}
                type="time"
              ></MyInput>
            </div>
          </div>
          <div className="box-textarea">
            <label htmlFor="description">Description</label>
            <MyTextArea
              name="description"
              id="description"
              control={control}
            ></MyTextArea>
          </div>
          <div className="box-textarea">
            <label htmlFor="note">Note</label>
            <MyTextArea name="note" id="note" control={control}></MyTextArea>
          </div>
        </>

        <div className="box-input">
          <button type="submit" className="">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
