#include <iostream> 
#include <stdio.h> 
#include <list>
#include <fstream>
#include <string>
#include <curl/curl.h> 

using namespace std; 

int geturldata(list<string>& src_url)
{
	src_url.clear();
	char url[200];
	string line;
	
	ifstream myfile ("info.txt");

	if (myfile.is_open())
	{
		const char* pstart;   
		const char* pend;
		
		getline (myfile,line);
   		pstart=strstr(line.c_str(),"http://");
	
		while(pstart!=NULL)
		{
			memset(url,0,sizeof(url));
			pend=strstr(pstart," ");
			if(pend!=NULL)
			{
				strncpy(url,pstart,(pend-pstart));
				pstart=strstr(pend,"http://");
			}
			else
			{
				strcpy(url,pstart);
				pstart=pend;
			}
			if(url[strlen(url)-5]=='a')
				url[strlen(url)-5]='n';
			src_url.push_back(url);
		 }
    myfile.close();
	}
return 0;
}


int main()
{ 
	list<string> src_url;
	geturldata(src_url);
	list<string>::iterator it=src_url.begin();

	CURL *image; 
	CURLcode imgresult; 
	FILE *fp; 
	int i=1;
	
	while(it!=src_url.end())
	{
		image = curl_easy_init(); 
		if( image )
		{ 
			// Open file 
			char filename[40];
			sprintf(filename,"./output/image_%d.jpg",i);
			fp = fopen(filename, "wb"); 
			if(fp == NULL) 
				cout << "File cannot be opened"; 

			curl_easy_setopt(image, CURLOPT_URL, *it); 
			curl_easy_setopt(image, CURLOPT_WRITEFUNCTION, NULL); 
			curl_easy_setopt(image, CURLOPT_WRITEDATA, fp); 

			// Grab image 
			imgresult = curl_easy_perform(image); 
			if( imgresult )
			{ 
				cout << "Cannot grab the image!\n"; 
			}
			else
			{
				cout << "Generating " << filename << endl; 
			}
			// Clean up the resources 
			curl_easy_cleanup(image); 
			// Close the file 
			fclose(fp); 
		}
	it++;
	i++;
	Sleep(10);
	}
return 0; 
} 