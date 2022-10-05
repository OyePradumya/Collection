#include <iostream>
#include <vector>
#include <string>
#include <cstdlib>
#include <map>
#define NUMBER_OF_DRUG_TYPES 4
using namespace std;
class Mutex{    //Stub to manage a mutex
public:
    void lock(){cout<<"Mutex acquired the lock"<<endl;}
    void unlock(){cout<<"Mutex released the lock"<<endl;}
};
class drugInfo { //Base class for drug information
protected:
    double dosage;
    bool sideEffects;
    string drugName;
    int drugIndex;
public:
    int getDrugIndex() {return drugIndex;}
    string getDrugName(){return drugName;}
    static string indexToName(int index){
        if(index == 0){return "DrugA";}
        if(index == 1){return "DrugB";}
        if(index == 2){return "DrugC";}
        if(index == 3){return "DrugD";}
    }
};
class DrugA: public drugInfo {
public:
    DrugA(){
        drugIndex=0;
        drugName="DrugA";
    }
};
class DrugB: public drugInfo {
public:
    DrugB(){
        drugIndex=1;
        drugName="DrugB";
    }
};
class DrugC: public drugInfo {
public:
    DrugC(){
        drugIndex=2;
        drugName="DrugC";
    }
};
class DrugD: public drugInfo {
public:
    DrugD(){
        drugIndex=3;
        drugName="DrugD";
    }
};
class baseTest { //XRay->radiology , blood->lab
protected:
    string testName;
public:
    string getTestName(){ return testName; }
    virtual drugInfo* prescribeRelatedDrug()=0;
};
class baseBloodTest:public baseTest {};
class cardiologyBloodTest:public baseBloodTest {
public:
    cardiologyBloodTest(){ testName="cardiologyBloodTest"; }
    drugInfo* prescribeRelatedDrug(){ return new DrugA;}
};
class endocrinologyBloodTest:public baseBloodTest {
public:
    endocrinologyBloodTest() { testName=("endocrinologyBloodTest"); }
    drugInfo* prescribeRelatedDrug(){ return new DrugB;}
};
class baseRadiologicalTest:public baseTest {};
class cardiologyEKGTest:public baseRadiologicalTest {
public:
    cardiologyEKGTest(){testName="EKG";}
    drugInfo* prescribeRelatedDrug(){ return new DrugC;}
};
class orthopedicsXRayTest:public baseRadiologicalTest {
public:
    orthopedicsXRayTest(){testName="X-RAY";}
    drugInfo* prescribeRelatedDrug(){ return new DrugD;}
};
class baseInsurance
{};
class governmentInsurance:public baseInsurance
{};
class otherInsurance:public baseInsurance
{};
class demographicInfo
{
private:
    string email;
    string telephoneNum;
public:
    void setInfo(string setEmail, string setTelephoneNum){
        email=setEmail;
        telephoneNum=setTelephoneNum;
    }
    const string getEmail() {
        return email;
    }
};
class patient {
private:
    string name;
    demographicInfo* patientDemographicInfo;
    baseInsurance* patientInsurance;
    vector<baseTest*>* testsHaveDone;
    vector<drugInfo*> drugInformationsPatientHolds;
public:
    patient(){}
    ~patient(){
        delete patientInsurance;
        delete patientDemographicInfo;
        delete testsHaveDone;
    }
    patient(string Name="NoName", demographicInfo* Info=NULL, baseInsurance* insurance=NULL,vector<baseTest*>* Tests=NULL){
        name=Name;
        patientDemographicInfo=Info;
        patientInsurance=insurance;
        testsHaveDone=Tests;
    }
    vector<baseTest*>* getTestsHaveDone() {return testsHaveDone;}
    const string getEmail() {return patientDemographicInfo->getEmail();}
    const string getName(){return name;}
    vector<drugInfo *>* getDrugsPatientHolds(){return &drugInformationsPatientHolds;}
    void addDrugInfo(drugInfo* added){drugInformationsPatientHolds.push_back(added);}
    void Update(int drugIndex){cout<<name<<" has been informed about "<<drugInfo::indexToName(drugIndex)<<endl;}
};
class baseTestRequest {
protected:
    string testType;
    string testName;
public:
    virtual baseTest* requestTest()=0;
    string getType(){ return testType;}
    string getTestName(){ return testName;}
};
class EKGrequest:public baseTestRequest {
public:
    EKGrequest(){testType="radiological";testName="EKG";}
    baseTest* requestTest(){ return new cardiologyEKGTest;}
};
class XRAYrequest:public baseTestRequest {
public:
    XRAYrequest(){testType="radiological";testName="X-RAY";}
    baseTest* requestTest(){ return new orthopedicsXRayTest;}
};
class endocrinologyBloodTestRequest:public baseTestRequest {
public:
    endocrinologyBloodTestRequest(){testType="blood";testName="endocrinologyBloodTest";}
    baseTest* requestTest(){ return new endocrinologyBloodTest;}
};
class cardiologyBloodTestRequest:public baseTestRequest {
public:
    cardiologyBloodTestRequest(){testType="blood";testName="cardiologyBloodTest";}
    baseTest* requestTest(){ return new cardiologyBloodTest;}
};
class doctor {
protected:
    drugInfo* prescribedDrug;
    virtual bool doctorIsAllowed(baseTest* test)=0;
public:
    virtual void prescribe(baseTest* test)
    {
        if(doctorIsAllowed(test)){
            prescribedDrug=test->prescribeRelatedDrug();
            cout<<"Doctor decided to prescribe "<<prescribedDrug->getDrugName()<<endl;
        }
    }
    drugInfo *getPrescribedDrug() { return prescribedDrug; }
};
class endocrinologist:public doctor {
    bool doctorIsAllowed(baseTest* test){ return test->getTestName()=="endocrinologyBloodTest";}
};
class orthopedist:public doctor {
    bool doctorIsAllowed(baseTest* test){ return test->getTestName()=="X-RAY";}
};
class cardiologist:public doctor {
    bool doctorIsAllowed(baseTest* test){ return test->getTestName()=="cardiologyBloodTest"||test->getTestName()=="EKG";}
};
class baseClinic { //Clinic==Department
protected:
    string clinicName;
    doctor* assignedDoctor;
    vector<baseTestRequest*> requiredTests;
public:
    baseClinic(){}
    ~baseClinic(){ delete assignedDoctor;}
    void assignDoctor(doctor* doctor){assignedDoctor=doctor;}
    string getClinicName() { return clinicName; }
    virtual vector<baseTestRequest*>* getRequiredTests(){ return &requiredTests;}
    doctor* getAssignedDoctor() {return assignedDoctor;}
};
class cardiologyClinic:public baseClinic {
public:
    cardiologyClinic(){
        clinicName="cardiology";
        requiredTests.push_back(new EKGrequest);
        requiredTests.push_back(new cardiologyBloodTestRequest);
    }
};
class orthopedicsClinic:public baseClinic {
public:
    orthopedicsClinic(){
        clinicName="orthopedics";
        requiredTests.push_back(new XRAYrequest);
    }
};
class endocrinologyClinic:public baseClinic {
public:
    endocrinologyClinic(){
        clinicName="endocrinology";
        requiredTests.push_back(new endocrinologyBloodTestRequest);
    }
};
class baseTestDepartment {//Client of Factory Pattern
protected:
    string expectedTestType;
    baseTest* testResult;
public:
    virtual void createTest(baseTestRequest* request){
        if(request->getType()==expectedTestType){//Template method
            testResult=request->requestTest();
            cout<<"A new "<<request->getTestName()<<" test has been done"<<endl;
        }
    }
    string &getExpectedTestType(){return expectedTestType;}
    baseTest* getTestResult(){return testResult;}
};
//Singleton Class
class radiologyDepartment : public baseTestDepartment {
private:
    radiologyDepartment(){ expectedTestType="radiological";}
    radiologyDepartment(const radiologyDepartment&);
    radiologyDepartment& operator=(const radiologyDepartment&);
    static radiologyDepartment *instance;
    static Mutex mutex;//symbolic mutex
public:
    static radiologyDepartment *GetInstance(){
        if(instance == NULL){
            mutex.lock();
            if(instance == NULL){
                instance = new radiologyDepartment();
            }
            mutex.unlock();
        }
        return instance;
    }
};
Mutex radiologyDepartment::mutex;
radiologyDepartment* radiologyDepartment::instance = NULL;
class labDepartment:public baseTestDepartment {
public:
    labDepartment(){expectedTestType="blood";}
};
class secretaryCommand {//Command of Command Pattern
protected:
    baseClinic* clinic;
    static radiologyDepartment* radiology;
    static vector<labDepartment*>* labDepartments;
    patient* requestingPatient;
public:
    secretaryCommand(){}
    secretaryCommand(baseClinic* givenClinic, patient* givenPatient) {
        clinic=givenClinic;
        requestingPatient=givenPatient;
    }
    ~secretaryCommand() { }
    virtual void execute()=0;
    virtual string getCommandName()=0;
    static void initializeTestDepartments(radiologyDepartment* rad, vector<labDepartment*>* labs) {
        radiology=rad;
        labDepartments=labs;
    }
};
radiologyDepartment* secretaryCommand::radiology=NULL;
vector<labDepartment*>* secretaryCommand::labDepartments=NULL;
class askForClinics:public secretaryCommand {
public:
    askForClinics(baseClinic *pClinic, patient *pPatient) : secretaryCommand(pClinic, pPatient) { }
    void execute() {
        cout<<requestingPatient->getName()<<" asked for clinic locations:"<<endl;
        if(clinic->getClinicName() != "radiology")
            cout<<"Radiology Clinic is located in:"<<endl;//a location will made up for each
        if(clinic->getClinicName() != "lab")
            cout<<"Lab Clinic is located in:"<<endl;
        if(clinic->getClinicName() != "cardiology")
            cout<<"Cardiology Clinic is located in:"<<endl;
        if(clinic->getClinicName() != "orthopedics")
            cout<<"Orthopedics Clinic is located in:"<<endl;
        if(clinic->getClinicName() != "endocrinology")
            cout<<"Endocrinology Clinic is located in:"<<endl;
    }
    string getCommandName(){return "askForClinics";}
};
class askForAnAppointment:public secretaryCommand
{
public:
    askForAnAppointment(baseClinic *pClinic, patient *pPatient) : secretaryCommand(pClinic, pPatient) {}
    void execute(){
        cout<<"An appointment is made in "<<clinic->getClinicName()<<" clinic for "<<requestingPatient->getName()<<endl;
    }
    string getCommandName(){return "askForAppointment";}
};

class seeDoctor:public secretaryCommand
{
public:
    seeDoctor(baseClinic *pClinic, patient *pPatient) : secretaryCommand(pClinic, pPatient) {}
    void execute(){
        cout<<"Doctor in "<<clinic->getClinicName()<<" clinic is ready to see "<<requestingPatient->getName()<<endl;
        vector<baseTest*>* testsOfPatient=requestingPatient->getTestsHaveDone();
        for(int i=0;i<testsOfPatient->size();i++)
        {
            clinic->getAssignedDoctor()->prescribe(testsOfPatient->at(i));
            drugInfo* drugInfoToAdd=clinic->getAssignedDoctor()->getPrescribedDrug();
            requestingPatient->addDrugInfo(drugInfoToAdd);
            cout<<"Patient received the drug."<<endl;
        }
    }
    string getCommandName(){return "seeDoctor";}
};

class checkTests:public secretaryCommand
{
public:
    checkTests(baseClinic *pClinic, patient *pPatient) : secretaryCommand(pClinic, pPatient) {}
    void execute(){
        vector<baseTest*>* currentTests=requestingPatient->getTestsHaveDone();
        vector<baseTestRequest*>* requiredTestsOfClinic=clinic->getRequiredTests();
        cout<<"Secretary in "<<clinic->getClinicName()<<" clinic started to check tests for "<<requestingPatient->getName()<<endl;
        for(int i=0;i<requiredTestsOfClinic->size();i++)
        {
            cout<<clinic->getClinicName()<<" clinic require "<<requiredTestsOfClinic->at(i)->getTestName()<<" test."<<endl;
            bool testFound=false;
            for(int j=0;j<currentTests->size();j++)
            {
                if(requiredTestsOfClinic->at(i)->getTestName()==currentTests->at(j)->getTestName())
                {
                    testFound=true;
                    cout<<requestingPatient->getName()<<" has done "<<requiredTestsOfClinic->at(i)->getTestName()<<" test before."<<endl;
                    break;
                }
            }
            if(!testFound)
            {
                cout<<requestingPatient->getName()<<" haven't done "<<requiredTestsOfClinic->at(i)->getTestName()<<" test before."<<endl;
                baseTestDepartment* departmentToTestWith;
                if(requiredTestsOfClinic->at(i)->getType()=="radiological")
                {
                    departmentToTestWith=radiology;
                }
                else if(requiredTestsOfClinic->at(i)->getType()=="blood")
                {
                    departmentToTestWith=labDepartments->at(0);//Normally it can be any other lab department. But there is no need to increase complexity.
                }
                cout<<departmentToTestWith->getExpectedTestType()<<" test is about to be done"<<endl;
                departmentToTestWith->createTest(requiredTestsOfClinic->at(i));
                currentTests->push_back(departmentToTestWith->getTestResult());
                cout<<"Patient successfully received the test result."<<endl;
            }
        }
    }
    string getCommandName(){return "checkTests";}
};
class secretary {//Invoker of Command Pattern
private:
    vector<secretaryCommand*> previousCommandsByCurrentPatient;
    patient* currentPatient;
    baseClinic* assignedClinic;
public:
    secretary(baseClinic* Clinic) {
        assignedClinic=Clinic;
    }
    ~secretary() {
        previousCommandsByCurrentPatient.erase(previousCommandsByCurrentPatient.begin(),previousCommandsByCurrentPatient.end());
    }
    void acceptNewPatient(patient* newPatient) {
        currentPatient=newPatient;
        cout<<"Secretary from "<<assignedClinic->getClinicName()<<" clinic accepted "<<currentPatient->getName()<<" to hear his requests"<<endl;
        previousCommandsByCurrentPatient.erase(previousCommandsByCurrentPatient.begin(),previousCommandsByCurrentPatient.end());
    }
    void acceptRequest(secretaryCommand* newCommand) {
        if(newCommand->getCommandName()=="seeDoctor") {
            bool testsHaveBeenChecked=false;
            for(int i=0;i<previousCommandsByCurrentPatient.size();i++) {
                if(previousCommandsByCurrentPatient[i]->getCommandName()=="checkTests") {
                    testsHaveBeenChecked=true;
                    break;
                }
            }
            if(!testsHaveBeenChecked) {
                cout<<currentPatient->getName()<<" requested to see the doctor from "<<assignedClinic->getClinicName()<<". However patient's tests haven't been checked before. "<<endl;
                secretaryCommand* checkFromSecretary=new checkTests(assignedClinic,currentPatient);
                checkFromSecretary->execute();
                previousCommandsByCurrentPatient.push_back(checkFromSecretary);
            }
        }
        newCommand->execute();
        previousCommandsByCurrentPatient.push_back(newCommand);
    }
    baseClinic *getAssignedClinic() const {
        return assignedClinic;
    }
};
class drugRecord { //Observer
private:
    vector<patient*> drugOwners[NUMBER_OF_DRUG_TYPES];//vector of patients for 4 different drugs
    map<int, string> nameForIndex;
public:
    ~drugRecord(){};
    drugRecord(){
        nameForIndex.insert(make_pair(0,"DrugA"));
        nameForIndex.insert(make_pair(1,"DrugB"));
        nameForIndex.insert(make_pair(2,"DrugC"));
        nameForIndex.insert(make_pair(3,"DrugD"));
    };
    void addPatientToRecord(patient* patientToAdd) { //'Attach' from observer pattern
        vector<drugInfo*>* drugsOfPatient = patientToAdd->getDrugsPatientHolds();
        for(int i=0;i<drugsOfPatient->size();i++) {
            drugOwners[drugsOfPatient->at(i)->getDrugIndex()].push_back(patientToAdd);
        }
    }
    void releasePatientFromRecord(patient* patientToLeave){ //'Detach' from observer pattern
        vector<drugInfo*>* drugsOfPatient=patientToLeave->getDrugsPatientHolds();
        for(int i=0;i<drugsOfPatient->size();i++) {
            for (unsigned int i = 0;i  < drugOwners[drugsOfPatient->at(i)->getDrugIndex()].size() ; i++) {
                if(drugOwners[drugsOfPatient->at(i)->getDrugIndex()][i]->getEmail() == patientToLeave->getEmail()){
                    drugOwners[drugsOfPatient->at(i)->getDrugIndex()].erase(drugOwners[drugsOfPatient->at(i)->getDrugIndex()].begin()+i);
                    return;
                }
            }
        }
    }
    void informAllPatients(int whichDrug) { //inform all drug owners about side effects 'Update' function
        for(int i=0;i<drugOwners[whichDrug].size();i++){
            drugOwners->at(i)->Update(whichDrug);
        }
    }
};

int main() {
    radiologyDepartment* radiology=radiologyDepartment::GetInstance();
    vector<labDepartment*> labs;
    labs.push_back(new labDepartment);
    secretaryCommand::initializeTestDepartments(radiology,&labs);
    baseClinic* endo = new endocrinologyClinic;
    baseClinic* card = new cardiologyClinic;
    baseClinic* orth = new orthopedicsClinic;
    endo->assignDoctor(new endocrinologist);
    card->assignDoctor(new cardiologist);
    orth->assignDoctor(new orthopedist);
    secretary endoSecretary(endo);
    secretary cardSecretary(card);
    secretary orthSecretary(orth);
    drugRecord record;
    bool endLoop=false;

    while(!endLoop) {
        while(true) {
            string result="";
            cout<<"Please enter number of the option:"<<endl;
            cout<<"1) New patient"<<endl;
            cout<<"2) Warn patients for a drug."<<endl;
            cout<<"3) Exit"<<endl;
            cin>>result;
            if(result=="1") {
                break;
            }
            else if(result=="2") {
                //call inform all patients of drugInfo from here. Make sure to ask which drug to inform about from user, like I asked what to do above..
                while(true){
                    string result="";
                    cout<<"Please enter the ID of the drug that you want to be informed:"<<endl;
                    cout<<"For drugA press 0"<<endl;
                    cout<<"For drugB press 1"<<endl;
                    cout<<"For drugC press 2"<<endl;
                    cout<<"For drugD press 3"<<endl;
                    cout<<"Press - to exit."<<endl;
                    cin>>result;
                    if(result == "0"){
                        record.informAllPatients(0);
                    }
                    else if(result == "1"){
                        record.informAllPatients(1);
                    }
                    else if(result == "2"){
                        record.informAllPatients(2);
                    }
                    else if(result == "3"){
                        record.informAllPatients(3);
                    }
                    else if(result == "-"){
                        endLoop= true;
                        break;
                    }
                }

            }
            else if(result=="3") {
                endLoop=true;
                break;
            }
        }
        if(!endLoop) {
            //patient demographics... will be asked and created here.
            patient* Patient=new patient("Kerimcan",new demographicInfo,new baseInsurance,new vector<baseTest*>);
            secretary* secretaryForClinic;
            while (true)
            {
                string result;
                cout<<"Choose which clinic to go:"<<endl;
                cout<<"1)Endocrinology Clinic"<<endl;
                cout<<"2)Orthopedics Clinic"<<endl;
                cout<<"3)Cardiology Clinic"<<endl;
                cin>>result;
                if(result=="1") secretaryForClinic=&endoSecretary;
                else if(result=="2") secretaryForClinic=&orthSecretary;
                else if(result=="3") secretaryForClinic=&cardSecretary;
                else
                {
                    cout<<"Wrong input."<<endl;
                    continue;
                }
                secretaryForClinic->acceptNewPatient(Patient);
                break;
            }
            while (true)
            {
                string result;
                cout<<"Choose what do you want secretary to do:"<<endl;
                cout<<"1)Check patient's tests"<<endl;
                cout<<"2)Ask for directions of other clinics."<<endl;
                cout<<"3)Ask for appointment"<<endl;
                cout<<"4)See the doctor."<<endl;
                cout<<"5)Patient wants to leave."<<endl;
                cin>>result;
                if(result=="5") {
                    cout<<"Patient leaves the clinic.";
                    break;
                }
                else if (result=="1") {
                    secretaryCommand* checkTestCommand = new checkTests(secretaryForClinic->getAssignedClinic(),Patient);
                    secretaryForClinic->acceptRequest(checkTestCommand);
                    continue;
                }
                else if(result=="2") {
                    secretaryCommand* directionsCommand = new askForClinics(secretaryForClinic->getAssignedClinic(),Patient);
                    secretaryForClinic->acceptRequest(directionsCommand);
                    continue;
                }
                else if(result=="3") {
                    secretaryCommand* appointmentCommand = new askForAnAppointment(secretaryForClinic->getAssignedClinic(),Patient);
                    secretaryForClinic->acceptRequest(appointmentCommand);
                    continue;
                }
                else if(result=="4") {
                    secretaryCommand* doctorCommand = new seeDoctor(secretaryForClinic->getAssignedClinic(),Patient);
                    secretaryForClinic->acceptRequest(doctorCommand);
                    continue;
                }
                else {
                    cout<<"Wrong input"<<endl;
                    continue;
                }
            }
            record.addPatientToRecord(Patient);
        }
    }

    return 0;
}
