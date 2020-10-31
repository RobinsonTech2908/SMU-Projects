import csv
import numpy as np

csvpath = r"02-Homework/03-Python/Booth_Does_Python/PyBank/Resources/budget_data.csv"
print(csvpath)

totalMonths = 0
totalProfit = 0

isFirstRow = True
lastRowProfit = 0
changeDict = {}

# read in the file
with open(csvpath, "r") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')

    # Read the header row first (skip this step if there is no header)
    csv_header = next(csvreader)
    # print(f"CSV Header: {csv_header}")

    # Read each row of data after the header
    for row in csvreader:
        # print(row)

        #row[0] = Month-Year
        #row[1] = Profit/Loss

        totalMonths += 1
        totalProfit += int(row[1])


        # if first row, do nothing, but set lastRowProfit
        #otherwise, get the change
        #row - last row profit
        # add to dictionary with month as the key
        # update last row profit
        #continue loop

        if isFirstRow:
            lastRowProfit = int(row[1])
            isFirstRow = False
        else:
            change = int(row[1]) - lastRowProfit
            changeDict[row[0]] = change
            lastRowProfit = int(row[1])

averageChange = np.mean(list(changeDict.values()))
# averageChange = list(changeDict.values()).sum() / len(changeDict.values())


maxChangeMonth = max(changeDict, key=changeDict.get)
maxChangeValue = changeDict[maxChangeMonth]

minChangeMonth = min(changeDict, key=changeDict.get)
minChangeValue = changeDict[minChangeMonth]

summaryString = f"""Finanical Analysis
-------------------------
Total Months: {totalMonths}
Total: ${totalProfit}
Average Change: ${round(averageChange, 2)}
Greatest Increase in Profits: {maxChangeMonth} (${maxChangeValue})
Greatest Decrease in Profits: {minChangeMonth} (${minChangeValue})
"""

#write summary string
with open("bank_results.txt", "w") as file1:
    file1.write(summaryString)
