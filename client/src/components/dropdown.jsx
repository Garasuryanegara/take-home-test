import { Button, Input, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dropdown() {
  const [vehicleBrand, setVehicleBrand] = useState([]);
  const [vehicleMakeID, setVehicleMakeID] = useState(null);
  const [vehicleModel, setVehicleModel] = useState([]);
  const [inputResult, setInputResult] = useState({
    vehicle_model_id: null,
    type: "vehicle",
    distance_unit: "mi",
    distance_value: "",
  });
  const [estimateResult, setEstimateResult] = useState({});
  const [weightUnit, setWeightUnit] = useState("carbon_g");
  const userLoggedIn = JSON.parse(localStorage.getItem("auth"));

  // fetch brand vehicle from API
  const fetchBrand = async () => {
    try {
      const response = await axios.get(
        "https://www.carboninterface.com/api/v1/vehicle_makes",
        {
          headers: {
            Authorization: "Bearer Rt5jIsPuhI1HKJctzWoQcQ",
          },
        }
      );
      setVehicleBrand(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch model vehicle from API
  const fetchModel = async () => {
    try {
      const response = await axios.get(
        `https://www.carboninterface.com/api/v1/vehicle_makes/${vehicleMakeID}/vehicle_models`,
        {
          headers: {
            Authorization: "Bearer Rt5jIsPuhI1HKJctzWoQcQ",
          },
        }
      );
      setVehicleModel(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  //get the result
  const enter = async () => {
    try {
      const response = await axios.post(
        "https://www.carboninterface.com/api/v1/estimates",
        inputResult,
        {
          headers: {
            Authorization: "Bearer Rt5jIsPuhI1HKJctzWoQcQ",
          },
        }
      );
      setEstimateResult(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBrand();
  }, []);
  useEffect(() => {
    if (vehicleMakeID !== null) {
      fetchModel();
    }
  }, [vehicleMakeID]);

  return (
    <>
      <div className="w-full h-full bg-slate-300">
        <div className="p-5 px-16 pt-16 flex gap-14">
          <div className="w-1/3">
            <div className="text-4xl font-bold">
              How much carbon emissions do our vehicles produce on our trips?
            </div>
            <div className="text-2xl font-semibold pt-9">
              Let's check it out!
            </div>
          </div>
          <div className="w-2/3 p-7 flex flex-col gap-7">
            <div className="text-xl font-semibold">
              Fill in the data below to calculate the estimated emissions
            </div>
            <div className="flex gap-5">
              <div className="w-1/2">
                <div className="p-2 text-lg font-medium">Vehicle Brand</div>
                <Select
                  placeholder="Select Vehicle Brand"
                  onChange={(e) => {
                    setVehicleMakeID(e.target.value);
                  }}
                >
                  {vehicleBrand.map((val) => {
                    return (
                      <option key={val?.data?.id} value={val?.data?.id}>
                        {val?.data?.attributes?.name}
                      </option>
                    );
                  })}
                </Select>
              </div>
              <div className="w-1/2 ">
                <div className="p-2 text-lg font-medium">Vehicle Model</div>
                <Select
                  placeholder="Select Vehicle Model"
                  onChange={(e) => {
                    setInputResult({
                      ...inputResult,
                      vehicle_model_id: e.target.value,
                    });
                  }}
                >
                  {vehicleModel.map((val) => {
                    return (
                      <option key={val?.data?.id} value={val?.data?.id}>
                        {val?.data?.attributes?.name}{" "}
                        {val?.data?.attributes?.year}
                      </option>
                    );
                  })}
                </Select>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="w-4/5">
                <div className="p-2 text-lg font-medium">Distance Value</div>
                <Input
                  placeholder="Your driving distance..."
                  onChange={(e) => {
                    setInputResult({
                      ...inputResult,
                      distance_value: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="w-1/5 flex items-end">
                <Select
                  variant="flushed"
                  onChange={(e) => {
                    setInputResult({
                      ...inputResult,
                      distance_unit: e.target.value,
                    });
                  }}
                >
                  <option value="mi">Miles</option>
                  <option value="km">Kilometers</option>
                </Select>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  if (userLoggedIn?.fullname) {
                    enter();
                  } else {
                    alert("Please log in to perform estimated calculations");
                  }
                }}
              >
                Enter
              </Button>
            </div>
            <div className="flex flex-col gap-5 border-2 border-gray-500 p-2 rounded-lg">
              <div className="text-3xl font-semibold">Result:</div>
              <div className="text-xl font-medium">
                Time :{" "}
                {estimateResult?.data
                  ? estimateResult?.data?.attributes?.estimated_at
                  : "-"}
              </div>
              <div className="text-xl font-medium">
                Vehicle :{" "}
                {estimateResult?.data
                  ? estimateResult?.data?.attributes?.vehicle_make +
                    " " +
                    estimateResult?.data?.attributes?.vehicle_model +
                    " " +
                    estimateResult?.data?.attributes?.vehicle_year
                  : "-"}
              </div>
              <div className="text-xl font-medium">
                Amount of Carbon Emissions :
              </div>
              <div className="text-2xl font-medium flex gap-4 w-52 pl-4">
                {estimateResult?.data
                  ? `${estimateResult?.data?.attributes[weightUnit]} `
                  : "-"}
                <Select
                  variant="flushed"
                  onChange={(e) => setWeightUnit(e.target.value)}
                >
                  <option value="carbon_g">gram</option>
                  <option value="carbon_lb">pound</option>
                  <option value="carbon_kg">kilogram</option>
                  <option value="carbon_mt">metric ton</option>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
