import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
  Grid,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";

import {
  TYPE_BATTERY,
  TYPE_BUILDING,
  TYPE_ELECTRICAL_GRID,
  TYPE_ELECTRICAL_VEHICLE,
  TYPE_PHOTOVOLTAIC_PANEL,
  TYPE_RESIDUAL_ELECTRICAL_LOADS,
  TYPE_WIND_TURBINE,
  TYPES,
} from "../../utils/constants";
import {
  validateCommonFields,
  validationSchemas,
} from "../../utils/deviceUtils";
import { PhotovoltaicPanel } from "../../models/PhotovoltaicPanel";
import { WindTurbine } from "../../models/WindTurbine";
import { Battery } from "../../models/Battery";
import { ElectricalVehicle } from "../../models/ElectricalVehicle";
import { ElectricalGrid } from "../../models/ElectricalGrid";
import { Building } from "../../models/Building";
import { ResidualElectricalLoads } from "../../models/ResidualElectricalLoads";
import TypeMenu from "./TypeMenu";
import { useAuth } from "../../providers/AuthProvider";

const DeviceDataModal = ({
  isOpen,
  onClose,
  data,
  setData,
  onSave,
  isDisabled,
}) => {
  const [errors, setErrors] = useState({});

  const { user } = useAuth();

  const isAdmin = user?.role === "ADMIN";

  /* Handle input field value change */
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Set data based on the field being changed
    if (name === "type") {
      /* Based on type create object of the appropriate class */
      switch (TYPES[value]) {
        case TYPE_PHOTOVOLTAIC_PANEL: {
          setData(
            (old) =>
              new PhotovoltaicPanel({
                ...old,
                [name]: TYPES.find((t) => t.id === parseInt(value, 10)),
              })
          );
          break;
        }
        case TYPE_WIND_TURBINE: {
          setData(
            (old) =>
              new WindTurbine({
                ...old,
                [name]: TYPES.find((t) => t.id === parseInt(value, 10)),
              })
          );
          break;
        }
        case TYPE_BATTERY: {
          setData(
            (old) =>
              new Battery({
                ...old,
                [name]: TYPES.find((t) => t.id === parseInt(value, 10)),
              })
          );
          break;
        }
        case TYPE_ELECTRICAL_VEHICLE: {
          setData(
            (old) =>
              new ElectricalVehicle({
                ...old,
                [name]: TYPES.find((t) => t.id === parseInt(value, 10)),
              })
          );
          break;
        }
        case TYPE_ELECTRICAL_GRID: {
          setData(
            (old) =>
              new ElectricalGrid({
                ...old,
                [name]: TYPES.find((t) => t.id === parseInt(value, 10)),
              })
          );
          break;
        }
        case TYPE_BUILDING: {
          setData(
            (old) =>
              new Building({
                ...old,
                [name]: TYPES.find((t) => t.id === parseInt(value, 10)),
              })
          );
          break;
        }
        case TYPE_RESIDUAL_ELECTRICAL_LOADS: {
          setData(
            (old) =>
              new ResidualElectricalLoads({
                ...old,
                [name]: TYPES.find((t) => t.id === parseInt(value, 10)),
              })
          );
          break;
        }
        default:
          throw new Error(`Unknown device type: ${data.type}`);
      }
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    // Reset validation error when user changes input
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  /* Validation logic for input fields */
  const validate = () => {
    let newErrors = validateCommonFields(data);

    console.log("here in validate", data.type.id);
    console.log("validationSchemas", validationSchemas[data.type.id]);
    if (data.type && validationSchemas[data.type.id]) {
      newErrors = {
        ...newErrors,
        ...validationSchemas[data.type.id](data),
      };
    }

    // Return true if there are no errors
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSave(data);
      onClose();
    }
  };

  return (
    <Modal size={"2xl"} closeOnEsc isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent>
        <ModalHeader>{isDisabled ? "Edit Device" : "Add Device"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Grid
            display={"flex"}
            p={2}
            justifyContent="space-around"
            templateColumns="repeat(2, 1fr)"
            gap={5}
          >
            <Box>
              {/* DER ID Field */}
              <FormControl isRequired mb={4} isInvalid={!!errors.derId}>
                <FormLabel>DER ID</FormLabel>
                <Input isDisabled name="derId" value={data.derId} type="text" />
                <FormErrorMessage>{errors.derId}</FormErrorMessage>
              </FormControl>

              {/* Device Name Field */}
              <FormControl isRequired mb={4} isInvalid={!!errors.name}>
                <FormLabel>Name</FormLabel>
                <Input
                  isDisabled={!isAdmin}
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>

              {/* Device Type Field */}
              <FormControl isRequired mb={4} isInvalid={!!errors.type}>
                <FormLabel>Type</FormLabel>
                {isDisabled || !isAdmin ? (
                  <Input isDisabled name="type" value={data.type.name} />
                ) : (
                  <TypeMenu
                    data={data}
                    handleChange={(id) => {
                      handleChange({ target: { name: "type", value: id } });
                    }}
                  />
                )}
                <FormErrorMessage>{errors.type}</FormErrorMessage>
              </FormControl>

              {/* Device Category Field */}
              {isDisabled && (
                <FormControl isRequired mb={4}>
                  <FormLabel>Category</FormLabel>
                  <Input
                    isDisabled
                    name="category"
                    value={data.category.name}
                  />
                </FormControl>
              )}

              {/* Max Available Output Power Field */}
              <FormControl
                isRequired
                mb={4}
                isInvalid={!!errors.maximumAvailablePower}
              >
                <FormLabel>MAX Available Output Power</FormLabel>
                <Input
                  isDisabled={!isAdmin}
                  name="maximumAvailablePower"
                  value={data.maximumAvailablePower}
                  onChange={handleChange}
                  type="number"
                />
                <FormErrorMessage>
                  {errors.maximumAvailablePower}
                </FormErrorMessage>
              </FormControl>
            </Box>

            {data.type &&
              data.type !== TYPE_BUILDING &&
              data.type !== TYPE_RESIDUAL_ELECTRICAL_LOADS && (
                <Box>
                  {/* Dynamic fields based on the type */}
                  {data.type === TYPE_PHOTOVOLTAIC_PANEL ? (
                    <>
                      <FormControl
                        isRequired
                        mb={4}
                        isInvalid={!!errors.outputPower}
                      >
                        <FormLabel>Output Power</FormLabel>
                        <Input
                          isDisabled={!isAdmin}
                          name="outputPower"
                          value={data.outputPower}
                          onChange={handleChange}
                          type="number"
                        />
                        <FormErrorMessage>
                          {errors.outputPower}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isRequired
                        mb={4}
                        isInvalid={!!errors.voltage}
                      >
                        <FormLabel>Voltage</FormLabel>
                        <Input
                          isDisabled={!isAdmin}
                          name="voltage"
                          value={data.voltage}
                          onChange={handleChange}
                          type="number"
                        />
                        <FormErrorMessage>{errors.voltage}</FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isRequired
                        mb={4}
                        isInvalid={!!errors.current}
                      >
                        <FormLabel>Current</FormLabel>
                        <Input
                          isDisabled={!isAdmin}
                          name="current"
                          value={data.current}
                          onChange={handleChange}
                          type="number"
                        />
                        <FormErrorMessage>{errors.current}</FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isRequired
                        mb={4}
                        isInvalid={!!errors.openCircuitVoltage}
                      >
                        <FormLabel>Open Circuit Voltage</FormLabel>
                        <Input
                          isDisabled={!isAdmin}
                          name="openCircuitVoltage"
                          value={data.openCircuitVoltage}
                          onChange={handleChange}
                          type="number"
                        />
                        <FormErrorMessage>
                          {errors.openCircuitVoltage}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isRequired
                        mb={4}
                        isInvalid={!!errors.shortCircuitCurrent}
                      >
                        <FormLabel>Short Circuit Current</FormLabel>
                        <Input
                          isDisabled={!isAdmin}
                          name="shortCircuitCurrent"
                          value={data.shortCircuitCurrent}
                          onChange={handleChange}
                          type="number"
                        />
                        <FormErrorMessage>
                          {errors.shortCircuitCurrent}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isRequired
                        mb={4}
                        isInvalid={!!errors.powerTolerance}
                      >
                        <FormLabel>Power Tolerance</FormLabel>
                        <Input
                          isDisabled={!isAdmin}
                          name="powerTolerance"
                          value={data.powerTolerance}
                          onChange={handleChange}
                          type="number"
                        />
                        <FormErrorMessage>
                          {errors.powerTolerance}
                        </FormErrorMessage>
                      </FormControl>
                    </>
                  ) : data.type === TYPE_BATTERY ? (
                    <>
                      <FormControl
                        isRequired
                        mb={4}
                        isInvalid={!!errors.capacity}
                      >
                        <FormLabel>Capacity</FormLabel>
                        <Input
                          isDisabled={!isAdmin}
                          name="capacity"
                          value={data.capacity}
                          onChange={handleChange}
                          type="number"
                        />
                        <FormErrorMessage>{errors.capacity}</FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isRequired
                        mb={4}
                        isInvalid={!!errors.minStateOfCharge}
                      >
                        <FormLabel>Minimum State of Charge</FormLabel>
                        <Input
                          isDisabled={!isAdmin}
                          name="minStateOfCharge"
                          value={data.minStateOfCharge}
                          onChange={handleChange}
                          type="number"
                        />
                        <FormErrorMessage>
                          {errors.minStateOfCharge}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isRequired
                        mb={4}
                        isInvalid={!!errors.maxStateOfCharge}
                      >
                        <FormLabel>Maximum State of Charge</FormLabel>
                        <Input
                          isDisabled={!isAdmin}
                          name="maxStateOfCharge"
                          value={data.maxStateOfCharge}
                          onChange={handleChange}
                          type="number"
                        />
                        <FormErrorMessage>
                          {errors.maxStateOfCharge}
                        </FormErrorMessage>
                      </FormControl>
                    </>
                  ) : data.type === TYPE_WIND_TURBINE ? (
                    <>
                      <FormControl
                        isRequired
                        mb={4}
                        isInvalid={!!errors.cutInWindSpeed}
                      >
                        <FormLabel>Cut in Wind Speed</FormLabel>
                        <Input
                          isDisabled={!isAdmin}
                          name="cutInWindSpeed"
                          value={data.cutInWindSpeed}
                          onChange={handleChange}
                          type="number"
                        />
                        <FormErrorMessage>
                          {errors.cutInWindSpeed}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isRequired
                        mb={4}
                        isInvalid={!!errors.outputVoltages}
                      >
                        <FormLabel>Output Voltages</FormLabel>
                        <Input
                          isDisabled={!isAdmin}
                          name="outputVoltages"
                          value={data.outputVoltages}
                          onChange={handleChange}
                          type="text"
                        />
                        <FormErrorMessage>
                          {errors.outputVoltages}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isRequired
                        mb={4}
                        isInvalid={!!errors.powerRatings}
                      >
                        <FormLabel>Power Ratings</FormLabel>
                        <Input
                          isDisabled={!isAdmin}
                          name="powerRatings"
                          value={data.powerRatings}
                          onChange={handleChange}
                          type="number"
                        />
                        <FormErrorMessage>
                          {errors.powerRatings}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isRequired
                        mb={4}
                        isInvalid={!!errors.currentRatings}
                      >
                        <FormLabel>Current Ratings</FormLabel>
                        <Input
                          isDisabled={!isAdmin}
                          name="currentRatings"
                          value={data.currentRatings}
                          onChange={handleChange}
                          type="number"
                        />
                        <FormErrorMessage>
                          {errors.currentRatings}
                        </FormErrorMessage>
                      </FormControl>
                    </>
                  ) : data.type === TYPE_ELECTRICAL_VEHICLE ? (
                    <>
                      <FormControl
                        isRequired
                        mb={4}
                        isInvalid={!!errors.motorPower}
                      >
                        <FormLabel>Motor Power</FormLabel>
                        <Input
                          isDisabled={!isAdmin}
                          name="motorPower"
                          value={data.motorPower}
                          onChange={handleChange}
                          type="number"
                        />
                        <FormErrorMessage>{errors.motorPower}</FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isRequired
                        mb={4}
                        isInvalid={!!errors.battery}
                      >
                        <FormLabel>Battery Capacity</FormLabel>
                        <Input
                          isDisabled={!isAdmin}
                          name="battery"
                          value={data.battery}
                          onChange={handleChange}
                          type="number"
                        />
                        <FormErrorMessage>{errors.battery}</FormErrorMessage>
                      </FormControl>
                    </>
                  ) : data.type === TYPE_ELECTRICAL_GRID ? (
                    <FormControl
                      isRequired
                      mb={4}
                      isInvalid={!!errors.co2EmissionRate}
                    >
                      <FormLabel>CO2 Emission Rate</FormLabel>
                      <Input
                        isDisabled={!isAdmin}
                        name="co2EmissionRate"
                        value={data.co2EmissionRate}
                        onChange={handleChange}
                        type="number"
                      />
                      <FormErrorMessage>
                        {errors.co2EmissionRate}
                      </FormErrorMessage>
                    </FormControl>
                  ) : (
                    <></>
                  )}
                </Box>
              )}
          </Grid>
        </ModalBody>

        <ModalFooter>
          {isAdmin && (
            <>
              <Button colorScheme="green" mr={3} onClick={handleSave}>
                Save
              </Button>
              <Button colorScheme="red" onClick={onClose}>
                Cancel
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeviceDataModal;
