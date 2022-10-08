<?php
session_start();
include('includes/config.php');
error_reporting(0);
if(strlen($_SESSION['login'])==0)
  { 
header('location:index.php');
}
else{
if(isset($_POST['submit']))
{
$aid=intval($_GET['said']);
$email=$_POST['emailid'];
$query=mysqli_query($con,"Update  tbladmin set AdminEmailId='$email'  where userType=0 && id='$aid'");
if($query)
{
echo "<script>alert('Sub-admin details updated.');</script>";
}
else{
echo "<script>alert('Something went wrong . Please try again.');</script>";
} 
}


?>


<!DOCTYPE html>
<html lang="en">
    <head>

        <title>Newsportal |Edit Subadmin</title>

        <!-- App css -->
        <link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/core.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/components.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/icons.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/pages.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/menu.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/responsive.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" href="../plugins/switchery/switchery.min.css">
        <script src="assets/js/modernizr.min.js"></script>

    </head>


    <body class="fixed-left">

        <!-- Begin page -->
        <div id="wrapper">

<!-- Top Bar Start -->
 <?php include('includes/topheader.php');?>
<!-- Top Bar End -->


<!-- ========== Left Sidebar Start ========== -->
           <?php include('includes/leftsidebar.php');?>
 <!-- Left Sidebar End -->

            <div class="content-page">
                <!-- Start content -->
                <div class="content">
                    <div class="container">


                        <div class="row">
							<div class="col-xs-12">
								<div class="page-title-box">
                                    <h4 class="page-title">Edit Subadmin</h4>
                                    <ol class="breadcrumb p-0 m-0">
                                        <li>
                                            <a href="#">Admin</a>
                                        </li>
                                        <li>
                                            <a href="#">Subadmin </a>
                                        </li>
                                        <li class="active">
                                            Edit Subadmin
                                        </li>
                                    </ol>
                                    <div class="clearfix"></div>
                                </div>
							</div>
						</div>
                        <!-- end row -->


                        <div class="row">
                            <div class="col-sm-12">
                                <div class="card-box">
                                    <h4 class="m-t-0 header-title"><b>Edit Subadmin </b></h4>
                                    <hr />
                        		


<div class="row">
<div class="col-sm-6">  
<!---Success Message--->  
<?php if($msg){ ?>
<div class="alert alert-success" role="alert">
<strong>Well done!</strong> <?php echo htmlentities($msg);?>
</div>
<?php } ?>

<!---Error Message--->
<?php if($error){ ?>
<div class="alert alert-danger" role="alert">
<strong>Oh snap!</strong> <?php echo htmlentities($error);?></div>
<?php } ?>


</div>
</div>

<?php 
$aid=intval($_GET['said']);
$query=mysqli_query($con,"Select * from  tbladmin where userType=0 && id='$aid'");
$cnt=1;
while($row=mysqli_fetch_array($query))
{
?>




                        			<div class="row">
                        				<div class="col-md-6">
                        		<form class="form-horizontal" name="suadmin" method="post">
	                                            <div class="form-group">
	                                   <label class="col-md-2 control-label">Username</label>
	                                   <div class="col-md-10">
	                                       <input type="text" class="form-control" value="<?php echo htmlentities($row['AdminUserName']);?>" name="adminusernmae" readonly>
	                                                </div>
	                                            </div>
	                                     
            <div class="form-group">
            <label class="col-md-2 control-label">Emailid</label>
            <div class="col-md-10">
            <input type="text" class="form-control" value="<?php echo htmlentities($row['AdminEmailId']);?>" name="emailid" required>
           </div>
           </div>

             <div class="form-group">
            <label class="col-md-2 control-label">Creation Dtae</label>
            <div class="col-md-10">
            <input type="text" class="form-control" value="<?php echo htmlentities($row['CreationDate']);?>" name="cdate" readonly>
           </div>
           </div>

             <div class="form-group">
            <label class="col-md-2 control-label">Updation date</label>
            <div class="col-md-10">
            <input type="text" class="form-control" value="<?php echo htmlentities($row['UpdationDate']);?>" name="udate" readonly>
           </div>
           </div>
<?php } ?>
        <div class="form-group">
                                                    <label class="col-md-2 control-label">&nbsp;</label>
                                                    <div class="col-md-10">
                                                  
                                                <button type="submit" class="btn btn-custom waves-effect waves-light btn-md" name="submit">
                                                    Update
                                                </button>
                                                    </div>
                                                </div>

	                                        </form>
                        				</div>


                        			</div>


                        			




           
                       


                                </div>
                            </div>
                        </div>
                        <!-- end row -->


                    </div> <!-- container -->

                </div> <!-- content -->

<?php include('includes/footer.php');?>

            </div>


        </div>
        <!-- END wrapper -->



        <script>
            var resizefunc = [];
        </script>

        <!-- jQuery  -->
        <script src="assets/js/jquery.min.js"></script>
        <script src="assets/js/bootstrap.min.js"></script>
        <script src="assets/js/detect.js"></script>
        <script src="assets/js/fastclick.js"></script>
        <script src="assets/js/jquery.blockUI.js"></script>
        <script src="assets/js/waves.js"></script>
        <script src="assets/js/jquery.slimscroll.js"></script>
        <script src="assets/js/jquery.scrollTo.min.js"></script>
        <script src="../plugins/switchery/switchery.min.js"></script>

        <!-- App js -->
        <script src="assets/js/jquery.core.js"></script>
        <script src="assets/js/jquery.app.js"></script>

    </body>
</html>
<?php } ?>