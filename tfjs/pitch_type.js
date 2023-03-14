const model =tf.sequential();
model.add(tf.layers.dense({units: 250, activation: 'relu', inputShape: [8]}));
model.add(tf.layers.dense({units: 175, activation: 'relu'}));
model.add(tf.layers.dense({units: 150, activation: 'relu'}));
model.add(tf.layers.dense({units: NUM_PITCH_CLASSES, activation: 'softmax'}));

model.compile({
    optimizer:tf.train.admam(),
    loss:'sparseCategoricalCrossentropy',
    metrics:['accuracy']
});

async function evaluate(useTestData){
    let results = {};
    await trainingValidationData.forEachAsync(pitchTypeBatch => {
        const values = model.predict(pitchTypeBatch.xs).dataSync();
        const classSize =  TRAINING_DATA_LENGTH / NUM_PITCH_CLASSES;
        for (let i = 0; i < NUM_PITCH_CLASSES; i++) {
            results[pitchFromClassNum(i)] = {
              training: calcPitchClassEval(i, classSize, values)
            };
        }
    });
    if (useTestData){
        await testValidationData.forEachAsync(pitchTypeBatch => {
            const values = model.predict(pitchTypeBatch.xs).dataSync();
            const classSize = TEST_DATA_LENGTH/NUM_PITCH_CLASSES;
            for (let i = 0;i<NUM_PITCH_CLASSES;i++){
                results[pitchFromClassNum(i)].validation = calcPitchClassEval(i,classSize,values);
            }
        });
    }
    return results;
};

async function predictSample(sample) {
    let result = model.predict(tf.tensor(sample,[1,sample.length])).arraySync();
    var maxValue = 0;
    var predictedPitch = 7;
    for (var i = 0; i < NUM_PITCH_CLASSES; i++) {
        if (result[0][i] > maxValue) {
          predictedPitch = i;
          maxValue = result[0][i];
        }
      }
      return pitchFromClassNum(predictedPitch);
    }

    // Determines accuracy evaluation for a given pitch class by index
function calcPitchClassEval(pitchIndex, classSize, values) {
    // Output has 7 different class values for each pitch, offset based on
    // which pitch class (ordered by i)
    let index = (pitchIndex * classSize * NUM_PITCH_CLASSES) + pitchIndex;
    let total = 0;
    for (let i = 0; i < classSize; i++) {
      total += values[index];
      index += NUM_PITCH_CLASSES;
    }
    return total / classSize;
  }
  
  // Returns the string value for Baseball pitch labels
  function pitchFromClassNum(classNum) {
    switch (classNum) {
      case 0:
        return 'Fastball (2-seam)';
      case 1:
        return 'Fastball (4-seam)';
      case 2:
        return 'Fastball (sinker)';
      case 3:
        return 'Fastball (cutter)';
      case 4:
        return 'Slider';
      case 5:
        return 'Changeup';
      case 6:
        return 'Curveball';
      default:
        return 'Unknown';
    }
  }
  
  module.exports = {
    evaluate,
    model,
    pitchFromClassNum,
    predictSample,
    testValidationData,
    trainingData,
    TEST_DATA_LENGTH
  }