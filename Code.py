import numpy as np
import pandas as pd
from sklearn.svm import SVC
import matplotlib.pyplot as plt
from sklearn import model_selection
from sklearn.metrics import r2_score
from sklearn.compose import ColumnTransformer
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import OneHotEncoder
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import ExtraTreesClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import PolynomialFeatures
from sklearn.model_selection import train_test_split
names = []
models = []
results = []
#Regression
data=pd.read_csv("RegressionData.csv")
data=pd.get_dummies(data,columns=["State"])
x=data.drop(["Profit"],axis=1)
y=data["Profit"]
x=np.array(x)
y=np.array(y)
x_train,x_test,y_train,y_test=train_test_split(x,y,test_size=0.1)
scl=StandardScaler()
x_train=scl.fit_transform(x_train)
x_test=scl.transform(x_test)
model=LinearRegression()
model.fit(x_train[:,0].reshape(-1,1),y_train)
ytest_pred=model.predict(x_test[:,0].reshape(-1,1))
names.append("LinReg")
results.append(r2_score(ytest_pred,y_test))
print(f"LinReg: {r2_score(ytest_pred,y_test) * 100}%")
model=LinearRegression()
model.fit(x_train,y_train)
ytest_pred=model.predict(x_test)
names.append("MLR")
results.append(r2_score(ytest_pred,y_test))
print(f"MLR: {r2_score(ytest_pred,y_test) * 100}%")
poly=PolynomialFeatures(degree=2)
x_poly_train=poly.fit_transform(x_train)
x_poly_test=poly.fit_transform(x_test)
model=LinearRegression()
model.fit(x_poly_train,y_train)
ytest_pred=model.predict(x_poly_test)
names.append("PR")
results.append(r2_score(ytest_pred,y_test))
print(f"PR: {r2_score(ytest_pred,y_test) * 100}%")
#Classification
dataset = pd.read_csv("ClassificationData.csv")
array = dataset.values
X = array[:,0:8]
Y = array[:,8]
models.append(("LogReg", LogisticRegression(max_iter = 1000)))
models.append(("SVM", SVC()))
models.append(("KNN", KNeighborsClassifier()))
models.append(("DT", DecisionTreeClassifier()))
models.append(("RF", RandomForestClassifier()))
models.append(("ET", ExtraTreesClassifier()))
scoring = "accuracy"
for name, model in models:
	kfold = model_selection.KFold(n_splits = 10)
	cv_results = model_selection.cross_val_score(model, X, Y, cv = kfold, scoring = scoring)
	names.append(name)
	results.append(cv_results.mean())
	print(f"{name}: {cv_results.mean() * 100}%")
fig = plt.figure(figsize = (10, 5))
plt.bar(names, results, color = 'blue', width = 0.4)
plt.ylabel("Accuracy")
plt.xlabel("Algorithm")
plt.title("Algorithm Comparison")
plt.show()