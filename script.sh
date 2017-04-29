#!/bin/sh
echo "The total number of quote submissions since the launch: "
grep -c "Requesting for a quote..." server.log

echo "Compute the number of successful quotes"
grep -c "quote status = success" server.log
echo "Compute the number of unsuccessful quotes"
grep -c "quote status = failure" server.log
echo "Compute the average premium for the successful quotes"
premiums=$(perl -nle 'print $1 if /price =.*?(\d+)/'  server.log)
count=0;
total=0;
for i in ${premiums}
   do
     total=$(echo $total+$i | bc )
     ((count++))
   done
echo "scale=2; $total / $count" | bc
