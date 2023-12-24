class cal {

    static speed(distance, time) {
        return distance / time;
    }

    static BMI(weight, height) {
        return weight / (height * height);
    }

    static BMR(weight, height, age) {
        return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    }

    static caloriesBurned(weight, distance, time) {
        var Met = 0.2 + (0.9 * (speed(distance, time) / 3.6));
        return Met * weight * time;
    }

    static TDEE(weight, height, age, distance, time) {
        return BMR(weight, height, age) + caloriesBurned(weight, distance, time);
    }

}