
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

public class signup extends AppCompatActivity {
    EditText names,email,pas;
    Button sign;
    String myname,mypas,myemail;
    DatabaseReference def;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup);
        email=findViewById(R.id.editname);
        names=findViewById(R.id.name);
        pas=findViewById(R.id.editpaswrd);
        sign=findViewById(R.id.butsign);
        FirebaseDatabase sdef= FirebaseDatabase.getInstance();
        if (sdef == null) {
            Log.e("asdf","You must call FirebaseApp.initialize() first.");
        }


        sign.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                myemail=email.getText().toString();
                myname=names.getText().toString();
                mypas=pas.getText().toString();

                if (!TextUtils.isEmpty(myname.toString()) &&  !TextUtils.isEmpty(mypas.toString()) && !TextUtils.isEmpty(myemail.toString())) {
                  //  def=FirebaseDatabase.getInstance().getReference().child("Users").child(myname);
                   // Log.d("asdfg",def.toString());
                    String url="https://tcs-health-system-default-rtdb.firebaseio.com/Users/";
                          def=sdef.getReference("users").child(myemail.replace(".",","));

                    def.child("password").setValue(mypas);
                    def.child("name").setValue(myname);
                    def.child("email").setValue(myemail);


                    startActivity(new Intent(signup.this,Login.class));
                    finish();
                }
                else {
                    Toast.makeText(signup.this,"all fields mandatory",Toast.LENGTH_LONG).show();
                }

            }
        });

    }
}
