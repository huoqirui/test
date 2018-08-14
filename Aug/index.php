<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>index</title>
</head>
<body>
	<h1>用户管理</h1>
	<?php
$pdo=new PDO('mysql:host=localhost;dbname=test','root');
$pdo->exec('set names utf8');
$sql="SELECT * FROM `user`";
$smt=$pdo->query($sql);
$rows=$smt->fetchAll(PDO::FETCH_ASSOC);

	?>
<table width="700px" border='1px' cellspacing='0'>
	<tr>
		<th>ID</th>
		<th>用户名</th>
		<th>密码</th>
		<th>删除</th>
	</tr>
	<?php
	foreach($rows as $row){
		echo "<tr>";
		echo "<td>{$row['id']}</td>";
		echo "<td>{$row['username']}</td>";
		echo "<td>{$row['password']}</td>";
		echo "<td><a href='delete.php?id={$row['id']}'>删除</a></td>";
		echo "</tr>";
	}
	?>
</table>
</body>
</html>