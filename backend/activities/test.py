import datetime

def generate_activities(start_date,frequency,quantity):
    dates = []
    start_date = datetime.datetime.strptime(start_date, '%Y-%m-%d %H:%M:%S')
    # frequency is in hours
    for i in range(quantity):
        dates.append(start_date + datetime.timedelta(hours=frequency*i))
    return dates

def filter_activities(activities_dates, day):
    day = datetime.datetime.strptime(day, '%Y-%m-%d')
    filtered_activities = []
    for activity in activities_dates:

        if activity.day == day.day and activity.month == day.month and activity.year == day.year:
            filtered_activities.append(activity)
    return filtered_activities


print(filter_activities(generate_activities('2020-01-01 02:00:00', 4, 100), '2020-01-05'))