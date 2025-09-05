const moment = require('moment/moment');
const Randomizer = require('./randomizer');
const StrUtils = require('../str/strUtils');
const JSONLoader = require('../data/JSONLoader');

class FakeDataGenerator {
  static generateKazakhCarAccidentLocation() {
    // Kazakhstan cities
    const { kazakhCities } = JSONLoader;
    // Common street names in Kazakhstan
    const { streetNames } = JSONLoader;
    const { streetTypes } = JSONLoader;
    // Vehicle-specific locations
    const { vehicleLocations } = JSONLoader;
    // Landmarks relevant to driving in Kazakhstan
    const { drivingLandmarks } = JSONLoader;
    const city = Randomizer.getRandomArrayElement(kazakhCities);
    const streetName = Randomizer.getRandomArrayElement(streetNames);
    const streetType = Randomizer.getRandomArrayElement(streetTypes);
    const vehicleLocation = Randomizer.getRandomArrayElement(vehicleLocations);
    const landmark = Randomizer.getRandomArrayElement(drivingLandmarks);
    const secondStreetName = Randomizer
      .getRandomArrayElement(streetNames.filter((s) => s !== streetName));
    const secondCity = Randomizer.getRandomArrayElement(kazakhCities.filter((c) => c !== city));
    // Different location format patterns
    const locationDescriptionStringTemplate = Randomizer
      .getRandomArrayElement(JSONLoader.descriptionTemplates.locations);

    return StrUtils.interpolate(locationDescriptionStringTemplate, {
      streetName,
      streetType,
      vehicleLocation,
      secondStreetName,
      landmark,
      city,
      secondCity,
    });
  }

  static generateVehicleDamageDescription() {
    const damageLocation = Randomizer.getRandomArrayElement(JSONLoader.damageLocations);
    const damageType = Randomizer.getRandomArrayElement(JSONLoader.vehicleDamageTypes);
    const additionalDamage = Randomizer.getRandomArrayElement(JSONLoader.additionalDamages);
    const severity = Randomizer.getRandomArrayElement(JSONLoader.damageSeverities);
    const repairability = Randomizer.getRandomArrayElement(JSONLoader.repairabilities);
    const damageDescriptionTemplate = JSONLoader.descriptionTemplates.damage.vehicle;

    return StrUtils.interpolate(damageDescriptionTemplate, {
      damageLocation,
      damageType,
      additionalDamage,
      severity,
      repairability,
    });
  }

  static generatePersonInjuryDescription() {
    const injuryType = Randomizer.getRandomArrayElement(JSONLoader.injuryTypes);
    const bodyPart = Randomizer.getRandomArrayElement(JSONLoader.bodyParts);
    const severity = Randomizer.getRandomArrayElement(JSONLoader.injurySeverities);
    const treatment = Randomizer.getRandomArrayElement(JSONLoader.treatments);
    const prognosis = Randomizer.getRandomArrayElement(JSONLoader.prognosises);
    const damageDescriptionTemplate = JSONLoader.descriptionTemplates.damage.person;

    return StrUtils.interpolate(damageDescriptionTemplate, {
      injuryType,
      bodyPart,
      severity,
      treatment,
      prognosis,
    });
  }

  static generatePropertyDescription() {
    // Select a specific category and object
    const selectedCategory = Randomizer.getRandomArrayElement(JSONLoader.propertyTypes);
    const propertyObject = Randomizer.getRandomArrayElement(selectedCategory.objects);
    const propertyCategory = selectedCategory.type;
    const damageDescriptionTemplate = JSONLoader.descriptionTemplates.propertyDescription;

    return StrUtils.interpolate(damageDescriptionTemplate, {
      propertyObject,
      propertyCategory,
    });
  }

  static generatePropertyDamageDescription() {
    // Generate damage description
    const damageType = Randomizer.getRandomArrayElement(JSONLoader.propertyDamageTypes);
    const damageExtent = Randomizer.getRandomArrayElement(JSONLoader.damageExtents);
    const consequences = Randomizer.getRandomArrayElement(JSONLoader.consequences);
    const estimatedCost = Randomizer.getRandomInteger(500, 50) * 1000;
    const propertyDescription = this.generatePropertyDescription();
    const damageDescriptionTemplate = JSONLoader.descriptionTemplates.damage.property;

    return StrUtils.interpolate(damageDescriptionTemplate, {
      damageType,
      damageExtent,
      consequences,
      estimatedCost,
      propertyDescription,
    });
  }

  static generateCarAccidentDescription(car) {
    const timeOfDay = Randomizer.getRandomArrayElement(JSONLoader.timesOfDay);
    const weatherConditions = Randomizer.getRandomArrayElement(JSONLoader.weatherConditions);
    // Generate collision type
    const selectedCollision = Randomizer.getRandomArrayElement(JSONLoader.collisionTypes);
    const collisionObject = Randomizer.getRandomArrayElement(selectedCollision.objects);
    // Accident causes
    const cause = Randomizer.getRandomArrayElement(JSONLoader.accidentCauses);
    // Damage to claimant's vehicle
    const claimantDamageLocation = Randomizer
      .getRandomArrayElement(JSONLoader.claimantDamageLocations);
    const claimantDamageSeverity = JSONLoader.damageSeverities;
    // Generate victim-specific damage descriptions
    let victimDamageDescription = '';

    switch (selectedCollision.type) {
      case 'vehicle':
        victimDamageDescription = this.generateVehicleDamageDescription();
        break;
      case 'person':
        victimDamageDescription = this.generatePersonInjuryDescription();
        break;
      case 'property':
        victimDamageDescription = this.generatePropertyDamageDescription();
        break;
      default:
        break;
    }

    // Generate the complete description
    const descriptionTemplate = JSONLoader.descriptionTemplates.carAccidentDescription;

    return StrUtils.interpolate(descriptionTemplate, {
      timeOfDay,
      weatherConditions,
      collisionObject,
      cause,
      claimantDamageLocation,
      claimantDamageSeverity,
      victimDamageDescription,
      car,
    });
  }

  static generateInsuranceEventDate(policyDateBegin) {
    const currentDate = moment().format(JSONLoader.testData.datesFormatDMY);
    return Randomizer.getRandomDateBetweenTwoDates(policyDateBegin, currentDate)
      .format(JSONLoader.testData.datesFormatDMY);
  }

  static generateInsuranceEventData(car) {
    return {
      locationDescription: this.generateKazakhCarAccidentLocation(),
      IEDescription: this.generateCarAccidentDescription(car),
      victimVehicleDamageDescription: this.generateVehicleDamageDescription(),
      victimClientDamageDescription: this.generatePersonInjuryDescription(),
      victimOtherDamageDescription: this.generatePropertyDamageDescription(),
      victimOtherDescription: this.generatePropertyDescription(),
    };
  }
}

module.exports = FakeDataGenerator;
