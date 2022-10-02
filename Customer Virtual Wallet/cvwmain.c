#include "cvwfunctions.c"




struct acct {
    char name[100];
    int acctNo;
    int phNo;
    char city[100];
    float bal;
}cust[1000];



int custCount = 0, acctNo = 0, addr = 10001;
int i = 0, authstat = 0;

char str[100] = "Processing.........\n";
char str1[100] = "Saving............\n";





void main()
{
    authenticate();
    if (authstat == 1) {
        operation();
    }

}





int newAcct(int ind)
{
    cust[ind].acctNo = addr++;
    printf("\nEnter the name of the customer:- ");
    scanf("%s", cust[ind].name);
    printf("Enter Contact Number:-\t");
    scanf("%d", &cust[ind].phNo);
    printf("Enter city:- ");
    scanf("%s", cust[ind].city);
    printf("How much balance you want to maintain:- ");
    scanf("%f", &cust[ind].bal);
    return cust[ind].acctNo;
}





void findAcct(int acctNo)
{
    for (int i = 0; i < custCount; i++) {
        if (cust[i].acctNo == acctNo) {
            printf("Customer ID is:- %d\n", cust[i].acctNo);
            printf("Customer name:- %s\n", cust[i].name);
            printf("Customer mobile number:- %ld\n", cust[i].phNo);
            printf("customer city name:- %s\n", cust[i].city);
            printf("Account balance:- %.2f\n\n", cust[i].bal);
        }
    }
    return;
}




void subBal(int acctNo)
{
    float amt = 0;
    printf("Enter the bill amt to Pay:- ");
    scanf("%f", &amt);
    for (int i = 0; i < strlen(str) - 1; i++)
    {
        printf("%c", str[i]);
        Sleep(150);
    }
    for (int i = 0; i < custCount; i++) {
        if (cust[i].acctNo == acctNo) {
            if (cust[i].bal >= amt) {
                cust[i].bal -= amt;
                printf("\nUpdated Balance:- %.2f\n", cust[i].bal);
            }
            else {
                printf("\nAdd Balance to your Wallet:- ");
                addBal(acctNo);
            }
        }
    }
    return;
}




void addBal(int acctNo)
{
    float amt = 0;
    printf("Enter the amt to add for your Wallet:- ");
    scanf("%f", &amt);
    for (int i = 0; i < strlen(str) - 1; i++)
    {
        printf("%c", str[i]);
        Sleep(150);
    }
    for (int i = 0; i < custCount; i++) {
        if (cust[i].acctNo == acctNo) {
            cust[i].bal += amt;
            printf("\nUpdated account balance:- %.2f\n\n", cust[i].bal);
        }
    }
    return;
}




void allAccts() {
    for (int i = 0; i < custCount; i++)
    {
        printf("CUSTOMER-- %d\n", (i + 1));
        printf("\t Customer ID: %d\n", cust[i].acctNo);
        printf("\t customer name: %s\n", cust[i].name);
        printf("\t customer mobile: %d\n", cust[i].phNo);
        printf("\t Customer city: %s\n", cust[i].city);
        printf("\t Customer Balance: %.2f\n", cust[i].bal);
    }
    return;
}




void operation() {
    FILE* p;
    p = fopen("Database.csv", "a+");




    printf("<<<------------------------------------->>>\n[1]: Add New Customer Wallet.\n[2]: Search Existing Customer Account.\n[3]: Pay the Bills.\n[4]: Print All Customers Details.\n[5]: Top-Up Balance.\n[6]: Save & Exit.\n<<<------------------------------------->>>\n");


    printf("\nselect what do you want to do ?:- ");

   
        while (1) {
            scanf("%d", &ch);
            switch (ch) {
            case 1:
                custCount += 1;
                printf("Serial number:- %d", custCount);
                int addr = newAcct(i);
                i += 1;
                printf("Your Account Number is:- %d\n\n", addr);
                operation();
                break;
            case 2:
                printf("Enter the Account Number:- ");
                scanf("%d", &acctNo);
                findAcct(acctNo);
                operation();
                break;
            case 3:
                printf("Enter the Account Number:- ");
                scanf("%d", &acctNo);
                subBal(acctNo);
                operation();
                break;
            case 4:
                allAccts();
                operation();
                break;
            case 5:
                printf("Enter Your Account Number:- ");
                scanf("%d", &acctNo);
                addBal(acctNo);
                operation();
                break;
            case 6:
                fprintf(p, "%s,%s,%s,%s\n\n\n", "Account No.", "Name", "Ph No.", "Balanace");
                for (int i = 0; i < custCount; i++)
                    fprintf(p, "%d,%s,%d,%0.2f\n", cust[i].acctNo, cust[i].name, cust[i].phNo, cust[i].bal);
                fclose(p);
                for (int i = 0; i < strlen(str1) - 1; i++)
                {
                    printf("%c", str1[i]);
                    Sleep(150);
                }
                printf("\n<<<------Records Saved Successfully----->>>\n<<<--------Thanks For Using:):)--------->>>\n\n\n");
                printf(" \n\n\t\t@tmsagarofficial ");
                exit(0);
                break;
            default:
                printf("\nInvalid choice pls re-enter ur choice\n");
                operation();
            }
        }
    return;

}




void authenticate() {
    FILE* fp;
    fp = fopen("pw.txt", "r");
    
    fscanf(fp, "%s", data);
    printf("\nUSTOMER VIRTUAL WALLET \n\n");
    printf("\nEnter the password: ");
    scanf("%s", input);


    if (strcmp(data, input) == 0)
    {
        system("cls");
        printf("Authentication Succesfull.\n");
        authstat = 1;
    }
    else
    {
        printf("Authentication unsuccesful.\n");
        exit(1);
    }

}
