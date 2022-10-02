//A recursive function to generate Fibonacci sequence of n terms
#include<stdio.h>
#include<stdlib.h>
int fib(int);
void main(){
int n,i;
printf("Enter the value of n :");
scanf_s("%d",&n);
printf("Fibonacci series : ");
for(i=0;i<=n;i++)
{
printf("%d\t",fib(i));

}
}
int fib(int m){
	if (m==0) return 0;
	else if (m==1) return 1;
	else return (fib(m-1)+fib(m-2));

}
