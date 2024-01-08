// First Come, First Served
function fcfs(processes) {
  // Copy processes to prevent mutation of the original array
  const copyProcesses = [...processes];

  let currentTime = 0; // Current time initialized to 0
  let executedProcesses = []; // Store the sequence of executed processes
  let totalWaitingTime = 0; // Calculate total waiting time for processes

  while (copyProcesses.length > 0) {
    // Filter processes that have arrived by the current time
    const arrivedProcesses = copyProcesses.filter(
      (proc) => proc.arrival <= currentTime
    );

    // If no process has arrived yet, move time to the next process arrival time
    if (arrivedProcesses.length === 0) {
      currentTime = copyProcesses[0].arrival;
      continue;
    }

    // Sort the arrived processes by their arrival time
    arrivedProcesses.sort((a, b) => a.arrival - b.arrival);

    // Select the process with the shortest burst time
    const process = arrivedProcesses[0];

    // Update the current time
    currentTime += process.burst;

    // Calculate waiting time for the executed process
    const waitingTime = currentTime - process.arrival - process.burst;
    totalWaitingTime += waitingTime;

    // Calculate orbital time for the executed process
    const turnaroundTime = currentTime - process.arrival;

    console.log(process);
    // Push the executed process to the sequence
    executedProcesses.push({
      // process: process,
      // startTime: currentTime - process.burst,
      // endTime: currentTime,
      // turnaroundTime: turnaroundTime,
      process: {
        arrival: process.arrival,
        burst: process.burst,
      },
      calculate: {
        startTime: currentTime - process.burst,
        turnaroundTime: turnaroundTime,
      },
      extra: {
        endTime: currentTime,
        waitingTime: waitingTime,
      },
    });

    // Remove the executed process from the processes array
    const index = copyProcesses.findIndex((proc) => proc === process);
    copyProcesses.splice(index, 1);
  }

  // Calculate average waiting time
  const averageTurnaroundTime = totalWaitingTime / executedProcesses.length;

  return { executedProcesses, averageTurnaroundTime };
}

// Shortest Job First
function sjf(processes) {
  const copyProcesses = [...processes];

  let currentTime = 0; // Current time initialized to 0
  let executedProcesses = []; // Store the sequence of executed processes
  let totalTurnaroundTime = 0; // Calculate total turnaround time for processes

  copyProcesses.sort((a, b) => a.arrival - b.arrival); // Sort processes by arrival time initially

  while (copyProcesses.length > 0) {
    let arrivedProcesses = copyProcesses.filter(
      (proc) => proc.arrival <= currentTime
    );

    if (arrivedProcesses.length === 0) {
      currentTime = copyProcesses[0].arrival;
      continue;
    }

    arrivedProcesses.sort((a, b) => a.burst - b.burst);

    let shortestJob = arrivedProcesses.shift();

    currentTime += shortestJob.burst;

    const turnaroundTime = currentTime - shortestJob.arrival;
    totalTurnaroundTime += turnaroundTime;

    executedProcesses.push({
      // process: shortestJob,
      // startTime: currentTime - shortestJob.burst,
      // endTime: currentTime,
      // turnaroundTime: turnaroundTime,
      process: {
        arrival: shortestJob.arrival,
        burst: shortestJob.burst,
      },
      calculate: {
        startTime: currentTime - shortestJob.burst,
        turnaroundTime: turnaroundTime,
      },
      extra: { endTime: currentTime },
    });

    const index = copyProcesses.findIndex((proc) => proc === shortestJob);
    copyProcesses.splice(index, 1);
  }

  executedProcesses.sort((a, b) => a.process.arrival - b.process.arrival); // Sort based on arrival time

  const averageTurnaroundTime = totalTurnaroundTime / executedProcesses.length;

  return { executedProcesses, averageTurnaroundTime };
}

function rr(processes, timeQuantum) {
  const copyProcesses = processes.map((process, index) => ({
    ...process,
    originalOrder: index,
  }));

  let currentTime = 0;
  let executedProcesses = [];
  let totalTurnaroundTime = 0;
  let processStartTime = {};
  let processStartBurst = {};

  while (copyProcesses.length > 0) {
    let process = copyProcesses.shift();

    if (process.arrival > currentTime) {
      currentTime = process.arrival;
    }

    if (!(process.originalOrder in processStartTime)) {
      processStartTime[process.originalOrder] = currentTime;
      processStartBurst[process.originalOrder] = process.burst;
    }

    if (process.burst > timeQuantum) {
      process.burst -= timeQuantum;
      currentTime += timeQuantum;
      copyProcesses.push(process);
    } else {
      currentTime += process.burst;

      // Calculate the actual end time for the process
      const actualEndTime = currentTime;

      // Calculate the turnaround time for the executed process
      const turnaroundTime = actualEndTime - process.arrival;
      totalTurnaroundTime += turnaroundTime;

      executedProcesses.push({
        process: {
          arrival: process.arrival,
          burst: processStartBurst[process.originalOrder],
          originalOrder: process.originalOrder,
        },
        calculate: {
          startTime: processStartTime[process.originalOrder],
          turnaroundTime: turnaroundTime,
        },
        extra: { endTime: actualEndTime },
      });
    }
  }

  executedProcesses.sort(
    (a, b) => a.process.originalOrder - b.process.originalOrder
  );

  const averageTurnaroundTime = totalTurnaroundTime / executedProcesses.length;

  return { executedProcesses, averageTurnaroundTime };
}

function printTimelineRR(processes, timeQuantum) {
  const copyProcesses = processes.map((process, index) => ({
    ...process,
    originalOrder: index,
  }));

  let currentTime = 0; // Current time initialized to 0
  let timeline = "| "; // Store the timeline

  while (copyProcesses.length > 0) {
    let process = copyProcesses.shift(); // Get the first process in the queue

    if (process.arrival > currentTime) {
      // If the process hasn't arrived yet, move time to its arrival
      currentTime = process.arrival;
    }

    if (process.burst > timeQuantum) {
      // If the process needs more time to execute
      timeline += `P${process.originalOrder}(${currentTime}) | `;
      process.burst -= timeQuantum;
      currentTime += timeQuantum;
      copyProcesses.push(process); // Put the process at the end of the queue
    } else {
      // If the process completes within the time quantum
      const endTime = currentTime + process.burst;
      timeline += `P${process.originalOrder}(${currentTime}-${endTime}) | `;
      currentTime = endTime;
    }
  }

  console.log("Timeline for Round Robin:");
  console.log(timeline);
}

function all(result) {
  console.log("Executed Processes:", result.executedProcesses);
  console.log(
    "Average Waiting Or Turn Around Time:",
    result.averageTurnaroundTime
  );
}

// const processes = [
//   { arrival: 0, burst: 65 },
//   { arrival: 0, burst: 10 },
//   { arrival: 1, burst: 100 },
//   { arrival: 2, burst: 1 },
// ];

const processes = [
  { arrival: 0, burst: 1 },
  { arrival: 1, burst: 100 },
  { arrival: 2, burst: 1 },
  { arrival: 3, burst: 100 },
];

// all(fcfs(processes).executedProcesses);
// all(sjf(processes).executedProcesses);
all(rr(processes, 60));
// printTimelineRR(processes, 60);
